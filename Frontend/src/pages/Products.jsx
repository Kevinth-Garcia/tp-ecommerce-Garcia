
import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/products") // Server JSON
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="product-grid">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <span>${p.price}</span>
          <button>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}
