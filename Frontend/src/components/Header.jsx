import { useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";

export default function Header() {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="navbar">
      <h2 className="logo" onClick={() => navigate("/")}>
        🕹️FrikiMundo
      </h2>
    
      <nav className="bottons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/products")}>Productos</button>
        <button onClick={() => navigate("/about")}>Acerca de</button>
        <button onClick={() => navigate("/cart")}>
          Carrito ({totalItems})
        </button>
      </nav>
    </header>
  );
}
