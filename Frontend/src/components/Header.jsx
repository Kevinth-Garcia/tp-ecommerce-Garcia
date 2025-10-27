import React from "react";
import { useNavigate } from "react-router-dom"; //para navegar con el navbar por todas las paginas
import { useCartStore } from "../store/useCartStore"; //importo la funcion del carrito para que tome en cuenta los items que tiene//

export default function Header() {
  const navigate = useNavigate(); //Hook para navegar entre paginas//
  const items = useCartStore((s) => s.items); //items que se encuentran en el carro
  const toggleCart = useCartStore((s) => s.toggleCart); //abrir y cerrar el carro que viene del useCartStore//
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0); //Contador de productos que viene del useCartStore

  return (
    //header fijo para visibilidad del carro siempre//
    //una estructura sencilla//
    <header className="header-fixed">
      <div className="header-inner">
        <div className="logo" onClick={() => navigate("/")}>
          🕹️ Friki Mundo
        </div>

        <nav className="nav">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/products")}>Productos</button>
          <button onClick={() => navigate("/about")}>Acerca</button>
        </nav>

        <div className="actions">
          <button className="cartBtn" onClick={toggleCart}>
            🛒 ({totalItems})
          </button>
        </div>
      </div>
    </header>
  );
}
