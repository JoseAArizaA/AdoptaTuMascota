# AdoptaTuMascota

Aplicación web SPA para la gestión y adopción de mascotas, desarrollada con React + TypeScript y un backend con Express + JSON Server.

**Autor:** José Antonio — 2.º DAW · Desarrollo de Entornos Web en el Cliente (DEWC)

---

## Pasos de instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd AdoptaTuMascota
```

### 2. Instalar dependencias del frontend

```bash
npm install
```

### 3. Crear archivo `.env` en la raíz del proyecto

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Levantar el backend con Docker

```bash
docker compose up --build
```

### 5. Iniciar el frontend

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Variables de entorno

| Variable              | Ubicación             | Descripción                                       |
| --------------------- | ---------------------- | -------------------------------------------------- |
| `VITE_API_BASE_URL` | `.env` (raíz)       | URL base de la API (ej.`http://localhost:3000`)  |
| `PORT`              | `docker-compose.yml` | Puerto del servidor backend (por defecto `3000`) |
| `JWT_SECRET`        | `docker-compose.yml` | Clave secreta para firmar tokens JWT               |

---

## Usuario de prueba

| Email                 | Contraseña |
| --------------------- | ----------- |
| `usuario@gmail.com` | usuario     |
| joss@gmail.com        | joss        |

---

## Checklist de requisitos funcionales

- [X] **Página pública de inicio** o presentación (`/about`)
- [X] **Página pública de login** para obtener el JWT (`/login`)
- [X] **Almacenamiento del JWT** de forma adecuada (`localStorage` con clave `auth_session`)
- [X] **Rutas protegidas**:
  - [X] Impedir el acceso a páginas privadas sin autenticación (`ProtectedRoute.tsx`)
  - [X] Redirigir correctamente al login cuando sea necesario (`<Navigate to="/login">`)
- [X] **Página 404** para rutas inexistentes (`NotFoundPage.tsx`)
- [X] **Listado de elementos** de la entidad — GET (`PetsPage.tsx`)
- [X] **Consulta de detalles** de un elemento — GET (`PetDetailsPage.tsx`)
- [X] **Alta de un nuevo elemento** — POST (`AddPetPage.tsx` + `PetForm.tsx`)
- [X] **Edición de un elemento existente** — PATCH (`EditPetPage.tsx` + `PetForm.tsx`)
- [X] **Eliminación de elementos** — DELETE (`PetsPage.tsx`, `AdoptedPetsPage.tsx`)
- [X] **Gestión visible de errores de la API** (`react-hot-toast` + mensajes de error en formularios)
- [X] **Estados de carga** — loading (`EditPetPage.tsx`, `PetDetailsPage.tsx`)
- [X] **Estados vacíos** cuando no hay datos (`AdoptedPetsPage.tsx`)

---

## Checklist de requisitos técnicos

- [X] **React + TypeScript**
- [X] **React Router** con:
  - [X] Rutas públicas (`/about`, `/login`, `/register`)
  - [X] Rutas privadas (`/pets`, `/pets/:id`, `/pets/new`, `/pets/edit/:id`, `/profile`, `/adopted`)
  - [X] Ruta comodín (`*`) para página 404
- [X] **Uso de hooks**: `useState`, `useEffect`, `useContext`, `useMemo`, `useNavigate`, `useParams`
- [X] **Manejo explícito de eventos**: `onClick`, `onSubmit`, `onChange`
- [X] **Comunicación asíncrona cliente-servidor**:
  - [X] Uso de `async / await` y `.then()`
  - [X] Separación de la lógica de acceso a la API en servicios (`petService.ts`, `authService.ts`, `http.ts`)
- [X] **Consumo de API REST mediante Axios**
- [X] **Diseño basado en componentes reutilizables**:
  - [X] Layout (`AppLayout.tsx`)
  - [X] Páginas (10 páginas en `src/pages/`)
  - [X] Componentes UI (`PetItem.tsx`, `PetForm.tsx`, `Header.tsx`, `ProtectedRoute.tsx`)
