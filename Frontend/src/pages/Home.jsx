import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="home">
      <h1 className="Titulo">Bienvenido a Friki Mundo</h1>
      <p className="texto">
        Encuentra los mejores productos en ropa y videojuegos 🎮👕
      </p>
      <button onClick={() => navigate("/products")} className="btn">
        Ver Productos
      </button>
    </section>
  );
}
