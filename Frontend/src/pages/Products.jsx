import { useEffect, useState } from "react";//manejo del estado local//
import { fetchProducts } from "../Service/Api"; //importo la Api para que nos muestre el catalogo de items//
import  ProductCard  from "../components/ProductCard";//se importa el ProductCard para que muestre el item//

export default function Products() {
  const [products, setProducts] = useState([]);//guarda los datos del backend//
  const [loading, setLoading] = useState(true);//controla los datos si se estan cargando//
  const [error, setError] = useState(null);//guarda el mensaje de error por si falla//

  useEffect(() => {//para llamar a la Api para hacer una peticion, exito guarda los datos, mensaje de error por si falla,desactiva el estado de carga para que no se congele la app//
    fetchProducts()
      .then((d) => setProducts(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="cargando-datos">Cargando...</p>;//condicional para ver si se cargan los datos//
  if (error) return <p className="error-datos">Error: {error}</p>;//condicional para que de mensaje de error por si falla la carga//

  const ropa = products.filter((p) => p.category === "ropa");//catalogo de ropa//
  const juegos = products.filter((p) => p.category === "juegos");//catalogo de juegos//

  const section = (title, arr) => (//ordenar la secciones de acuerdo a su categoria con scroll lateral//
    <section className="category">
      <h2>{title}</h2>
      <div className="scroll-container">
        {arr.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="products-page">
      <h1>Catálogo</h1>
      {section("Ropa", ropa)}
      {section("Juegos", juegos)}
    </div>
  );
}
