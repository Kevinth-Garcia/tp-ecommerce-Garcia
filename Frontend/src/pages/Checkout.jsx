import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //navegacion para que si no hay items vuelva a products y no deje comprar, si se realiza exitosamente la compra se volvera a la pagina de inicio//
import { useCartStore } from "../store/useCartStore"; // importo el js del uso del carrito para tomar en cuenta los items que se encuentran en el carro//
import { createOrder } from "../Service/Api"; // importo la Api para tomar las ordenes que se mandan desde el carro para hacer el checkout//

export default function Checkout() {
  const navigate = useNavigate(); // para que pueda redirigir al home y productos//
  const items = useCartStore((s) => s.items); //items que se encuentran en el carro//
  const getTotalPrice = useCartStore((s) => s.getTotalPrice); //precio total de todo los items//
  const clearCart = useCartStore((s) => s.clearCart); //limpieza de carro si no quieres comprar los items del carro//

  const [formData, setFormData] = useState({
    //formulario que se debe llenar para concretar la orden//
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      //condicional que revisa si hay o no items en el carro//
      alert("Tu carrito está vacío.");
      navigate("/products");
      return;
    }

    try {
      //constante que tomara los datos del comprador con sus items//
      const orderData = {
        items,
        total: getTotalPrice(),
        customer: formData,
        date: new Date().toISOString(),
      };

      await createOrder(orderData);
      alert("✅ Compra confirmada con éxito! Muchas gracias por su compra");
      clearCart();
      navigate("/"); //una vez que la compra ha sido exitosa aparecera un mesaje de confirmacion y agradecimiento//
    } catch (error) {
      console.error("Error creando la orden:", error); //si el fetch falla la orden no se mandara y no se realizara la compra dando un mensaje de fallo//
      alert("❌ Ocurrió un error al confirmar la compra.");
    }
  };

  return (
    //resumen de todos los items que se tienen junto con el formulario a llenar para completar la compra//
    <div className="checkout-page">
      <h2>Confirmación de compra</h2>

      <div className="checkout-summary">
        <h3>Resumen de productos</h3>
        {items.map((item) => (
          <div key={item.id} className="checkout-item">
            <p>
              {item.name} x{item.quantity} — ${item.price * item.quantity}
            </p>
          </div>
        ))}
        <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn primary">
          Confirmar compra
        </button>
      </form>
    </div>
  );
}
