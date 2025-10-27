import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); //useNavigate para la funcion del boton ver productos y redirija a la pagina de productos
  return (
    <section className="home">
      <h1 className="Tittle">Bienvenido a Friki Mundo</h1>
      <p className="Text">
        El lugar donde encontraras todo sobre el mundo Geek 🤯
      </p>
      <button className="btn-productos" onClick={() => navigate("/products")}>
        Ver productos
      </button>
    </section>
  );
}
