import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import jsonServer from "json-server";

const PORT = process.env.PORT ?? 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";

const app = express();
app.use(cors());
app.use(express.json());

// Reutilizamos UN solo router/db (evita crear router("db.json") múltiples veces)
const router = jsonServer.router("db.json");
const db = router.db;

// --- helpers ---
function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
}

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Missing token" });

  const token = header.slice("Bearer ".length);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

const userIdFromReq = (req) => Number(req.user?.sub);

function petBelongsToUser(pet, userId) {
  return pet && Number(pet.userId) === Number(userId);
}

// --- auth endpoints ---
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: "email y password son obligatorios" });
  }

  const user = db.get("users").find({ email }).value();
  if (!user?.passwordHash) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = signToken(user);
  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

app.post("/auth/register", async (req, res) => {
  const { email, password, name } = req.body ?? {};
  if (!email || !password || !name) {
    return res.status(400).json({ message: "name, email y password son obligatorios" });
  }

  const exists = db.get("users").find({ email }).value();
  if (exists) return res.status(409).json({ message: "Email ya registrado" });

  const passwordHash = await bcrypt.hash(password, 10);

  const users = db.get("users");
  const nextId = (users.maxBy("id").value()?.id ?? 0) + 1;

  const newUser = {
    id: nextId,
    email,
    name,
    passwordHash
  };

  users.push(newUser).write();

  return res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name });
});

app.get("/auth/me", authRequired, (req, res) => {
  return res.json({
    id: req.user.sub,
    email: req.user.email,
    name: req.user.name
  });
});

/**
 * --- PETS: endpoints para gestionar mascotas ---
 * Las mascotas tienen: id, nombre, especie, raza, edad, descripcion, adoptado, imagenUrl, userId
 */

// Obtener todas las mascotas (público - no requiere auth)
app.get("/pets", (req, res) => {
  const pets = db.get("pets").value();
  return res.json(pets);
});

// Obtener mascotas del usuario autenticado
app.get("/pets/mine", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const pets = db.get("pets").filter({ userId }).value();
  return res.json(pets);
});

// Obtener una mascota por ID (público)
app.get("/pets/:id", (req, res) => {
  const id = Number(req.params.id);
  const pet = db.get("pets").find({ id }).value();
  
  if (!pet) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }

  return res.json(pet);
});

// Crear una nueva mascota (requiere auth)
app.post("/pets", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const { nombre, especie, raza, edad, descripcion, adoptado = false, imagenUrl } = req.body ?? {};

  if (!nombre?.trim()) return res.status(400).json({ message: "nombre es obligatorio" });
  if (!especie?.trim()) return res.status(400).json({ message: "especie es obligatoria" });

  const pets = db.get("pets");
  const nextId = (pets.maxBy("id").value()?.id ?? 0) + 1;

  const newPet = {
    id: nextId,
    nombre: nombre.trim(),
    especie: especie.trim(),
    raza: raza?.trim() || "",
    edad: Number(edad) || 0,
    descripcion: descripcion?.trim() || "",
    adoptado: !!adoptado,
    imagenUrl: imagenUrl?.trim() || "",
    userId
  };

  pets.push(newPet).write();
  return res.status(201).json(newPet);
});

// Actualizar una mascota (requiere auth y ser el dueño)
app.put("/pets/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const pet = db.get("pets").find({ id }).value();
  if (!petBelongsToUser(pet, userId)) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }

  const { nombre, especie, raza, edad, descripcion, adoptado, imagenUrl } = req.body ?? {};
  if (!nombre?.trim()) return res.status(400).json({ message: "nombre es obligatorio" });
  if (!especie?.trim()) return res.status(400).json({ message: "especie es obligatoria" });

  const updated = {
    ...pet,
    nombre: nombre.trim(),
    especie: especie.trim(),
    raza: raza?.trim() || "",
    edad: Number(edad) || 0,
    descripcion: descripcion?.trim() || "",
    adoptado: !!adoptado,
    imagenUrl: imagenUrl?.trim() || "",
    userId // userId no cambia
  };

  db.get("pets").find({ id }).assign(updated).write();
  return res.json(updated);
});

// Actualizar parcialmente una mascota (requiere auth y ser el dueño)
app.patch("/pets/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const pet = db.get("pets").find({ id }).value();
  if (!petBelongsToUser(pet, userId)) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }

  const patch = {};
  
  if (req.body?.nombre !== undefined) {
    const n = String(req.body.nombre).trim();
    if (!n) return res.status(400).json({ message: "nombre no puede estar vacío" });
    patch.nombre = n;
  }
  if (req.body?.especie !== undefined) {
    const e = String(req.body.especie).trim();
    if (!e) return res.status(400).json({ message: "especie no puede estar vacía" });
    patch.especie = e;
  }
  if (req.body?.raza !== undefined) patch.raza = String(req.body.raza).trim();
  if (req.body?.edad !== undefined) patch.edad = Number(req.body.edad) || 0;
  if (req.body?.descripcion !== undefined) patch.descripcion = String(req.body.descripcion).trim();
  if (req.body?.adoptado !== undefined) patch.adoptado = !!req.body.adoptado;
  if (req.body?.imagenUrl !== undefined) patch.imagenUrl = String(req.body.imagenUrl).trim();

  // Bloqueo explícito: nunca permitir cambiar userId desde el cliente
  const updated = db.get("pets").find({ id }).assign(patch).write();
  return res.json(updated);
});

// Marcar mascota como adoptada (requiere auth)
app.patch("/pets/:id/adopt", authRequired, (req, res) => {
  const id = Number(req.params.id);
  const pet = db.get("pets").find({ id }).value();
  
  if (!pet) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }

  if (pet.adoptado) {
    return res.status(400).json({ message: "Esta mascota ya está adoptada" });
  }

  const updated = db.get("pets").find({ id }).assign({ adoptado: true }).write();
  return res.json(updated);
});

// Eliminar una mascota (requiere auth y ser el dueño)
app.delete("/pets/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const pet = db.get("pets").find({ id }).value();
  if (!petBelongsToUser(pet, userId)) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }

  db.get("pets").remove({ id }).write();
  return res.status(204).send();
});

// --- Otros endpoints (json-server fallback) ---
app.use(router);

app.listen(PORT, () => {
  console.log(`🐾 AdoptaTuMascota API corriendo en http://localhost:${PORT}`);
});
