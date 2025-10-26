export const API_URL = "http://localhost:3001"; //la base donde se esta ejecutando mi json server

async function apiRequest(endpoint, options = {}) {//una funcion para hacer las peticiones HTTP
  try {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    if (!res.ok) {//si la respuesta no es OK entonces que mande a la pagina 404//
      const errorText = await res.text();
      throw new Error(errorText || res.statusText);
    } 
    const text = await res.text();//verificador de respuesta que si hay texto lo covierte en JSON, si no hay nada lo devuelve como objeto vacio//
    return text ? JSON.parse(text) : {};
  } catch (error) {//uso para atrapar cualquier error ya sea de red, conexion, o parcing.
    console.error("API Error:", error);
    throw new Error("No se pudo conectar con el servidor.");
  }
}

export const fetchProducts = () => apiRequest("/products");//se hace un request al fetch que toma la lista de productos
export const fetchProduct = (id) => apiRequest(`/products/${id}`);//se hace un request al fetch que toma el producto 
export const createOrder = (order) =>
  apiRequest("/orders", {//se crea la orden en el cual es enviado al JSON en el cuerpo del request agregandolo al apartado orders//
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
