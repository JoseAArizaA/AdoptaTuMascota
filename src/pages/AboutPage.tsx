import Header from "../components/Header";

export default function AboutPage() {
    return (
        <div className="container">
            <Header title="Sobre Nosotros" subtitle="Conoce nuestra misión" />

            <section className="about-hero">
                <h2>Conectamos mascotas con familias</h2>
                <p>
                    <strong>Adopta Tu Mascota</strong> es una plataforma creada con el objetivo de facilitar
                    la adopción responsable de animales. Creemos que cada mascota merece un hogar
                    lleno de amor y que cada familia puede encontrar al compañero perfecto.
                </p>
            </section>

            <section className="about-mission">
                <h2>¿Por qué adoptar?</h2>
                <div className="about-mission-content">
                    <div className="about-stat">
                        <span className="about-stat-number">🏠</span>
                        <p>Miles de animales esperan un hogar cada año en refugios de toda España.</p>
                    </div>
                    <div className="about-stat">
                        <span className="about-stat-number">💛</span>
                        <p>Adoptar es un acto de amor que transforma dos vidas: la tuya y la de tu nueva mascota.</p>
                    </div>
                    <div className="about-stat">
                        <span className="about-stat-number">🌍</span>
                        <p>Cada adopción responsable contribuye a reducir el abandono animal y crear una sociedad más consciente.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}