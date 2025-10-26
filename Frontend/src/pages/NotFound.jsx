import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();//useNavigate para utilizar el boton de volver al inicio//

  return (
    <section className="err-seccion">
      <h2 className="err">404 - No encontrado</h2>
      <p className="err-text">La página que buscas no existe, Porfavor Presione el boton de volver al inicio</p>
      <button className="btn-back" onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </section>
  );
}
