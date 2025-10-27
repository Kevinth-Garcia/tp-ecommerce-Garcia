// src/components/CartDrawer.jsx
import React from "react";
import { useCartStore } from "../store/useCartStore"; //importo la funcion del carro para que me tome los items que vaya tomando de la pagina de productos//
import { useNavigate } from "react-router-dom"; //para que al presionar checkout me mande a la pagina de checkout y se finalice la compra//

export default function CartDrawer() {
  //funcion para abrir el carro off canvas//
  const isCartOpen = useCartStore((s) => s.isCartOpen); //muestra el carro//
  const closeCart = useCartStore((s) => s.closeCart); //cierra el carro
  const items = useCartStore((s) => s.items); //muestra los items en el carro//
  const clearCart = useCartStore((s) => s.clearCart); //elimina los items del carro//
  const increment = useCartStore((s) => s.increment); //aumenta los items del carro//
  const decrement = useCartStore((s) => s.decrement); //reduce los items del carro//
  const removeFromCart = useCartStore((s) => s.removeFromCart); //quita los items del carro//
  const getTotalPrice = useCartStore((s) => s.getTotalPrice); //precio total de los items//

  const navigate = useNavigate(); //para que me mande al checkout al pisar el boton de checkout//

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    //handle que usa condicional para verificar si tiene o no items en el carro
    if (items.length === 0) {
      alert("Tu carrito está vacío");
      return; //si no tiene items no proseguira y te dira que selecciones un item para continuar
    }
    closeCart();
    navigate("/checkout");
  }; //redirige a la pagina del checkout para finalizar la compra

  return (
    //estructura del carro//
    <>
      <div className="overlay" onClick={closeCart} />
      <aside className="cart-drawer" role="dialog" aria-modal="true">
        <header className="cart-header">
          <h3>Tu carrito</h3>
          <button className="close-btn" onClick={closeCart}>
            ✕
          </button>
        </header>

        <div className="cart-body">
          {items.length === 0 ? (
            <p className="empty">Tu carrito está vacío</p>
          ) : (
            items.map(
              (
                it //mapeo para que tome los items y sus//
              ) => (
                <div className="cart-item" key={it.id}>
                  <img src={it.image} alt={it.name} />
                  <div className="cart-info">
                    <h4>{it.name}</h4>
                    <p>Subtotal: ${(it.price * it.quantity).toFixed(2)}</p>
                    <div className="qty-controls">
                      <button onClick={() => decrement(it.id)}>-</button>
                      <span>{it.quantity}</span>
                      <button onClick={() => increment(it.id)}>+</button>
                      <button
                        className="remove"
                        onClick={() => removeFromCart(it.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>

        <footer className="cart-footer">
          <div className="total">Total: ${getTotalPrice().toFixed(2)}</div>
          <div className="cart-actions">
            <button className="btn-secondary" onClick={clearCart}>
              Vaciar carrito
            </button>
            <button className="btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </footer>
      </aside>
    </>
  );
}
