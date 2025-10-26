import { useParams } from "react-router-dom";//Importo para obtener el id del item
import { useEffect, useState } from "react";//Para manejo de estado y efectos secundarios
import { fetchProduct } from "../Service/Api";//Importo el Api que obtiene un producto específico desde el backend//
import { useCartStore } from "../store/useCartStore";//Hook del store de Zustand que maneja el carrito global.//

export default function ProductDetail() {
  const { id } = useParams();//obtiene el id del item//
  const [product, setProduct] = useState(null);//almacena los datos del item que se tiene del backend//
  const [loading, setLoading] = useState(true);//para indicar la carga de los datos desde la Api//
  const addToCart = useCartStore((s) => s.addToCart);//permite agregar items al carro desde cualquier parte de la app//

  useEffect(() => {//se ejecuta cada que cambia el id del item//
    fetchProduct(id)
      .then((d) => setProduct(d))//guarda los productos con exito//
      .catch(() => setProduct(null))//mensaje de error por si falla//
      .finally(() => setLoading(false));//cambia a false//
  }, [id]);

  if (loading) return <p>Cargando...</p>;//mensaje temporal mientras se cargan los datos//
  if (!product) return <p>Producto no encontrado</p>;//mensaje por si el item no se encuentra//

  return (//muestra los valores del producto asegurando que el precio tenga 2 decimales//
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>
        <strong>${product.price.toFixed(2)}</strong>
      </p>
      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          })
        }
      >
        Agregar al carrito
      </button>
    </div>
  );
}
