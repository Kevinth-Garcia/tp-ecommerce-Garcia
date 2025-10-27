// src/components/ProductCard.jsx
import React from "react";
import { useCartStore } from "../store/useCartStore"; //utilizo el useCartStore para importar la tarjeta de los items a la pagina productos donde todos se mostraran

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart); //creo la constante para que se puedan agregar los items al carro//

  return (
    //una tarjeta sencilla de items que muestre el id,nombre,img,descripcion,precio junto con su boton de agregar al carro//
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="desc">{product.description}</p>
      <div className="card-footer">
        <span className="price">${Number(product.price).toFixed(2)}</span>
        <button
          className="btn add-btn"
          onClick={() => {
            console.log("Agregar al carrito:", product.id, product.name); //para que se agregue el item cada que le de al boton//
            addToCart({
              id: product.id,
              name: product.name,
              price: Number(product.price),
              image: product.image,
            });
          }}
        >
          Agregar
        </button>
      </div>
    </article>
  );
}
