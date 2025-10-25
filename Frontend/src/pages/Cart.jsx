import useCartStore from "../store/useCartStore";

export default function Cart() {
  const { items, removeItem, clearCart } = useCartStore();

  if (items.length === 0) return <p>El carrito está vacío 🛒</p>;

  return (
    <section>
      <h1>Tu Carrito</h1>
      {items.map((i) => (
        <div key={i.id} className="cart-item">
          <h3>{i.name}</h3>
          <p>${i.price}</p>
          <button onClick={() => removeItem(i.id)}>Eliminar</button>
        </div>
      ))}
      <button onClick={clearCart}>Vaciar carrito</button>
    </section>
  );
}
