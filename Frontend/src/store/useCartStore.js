// src/store/useCartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(//se crea la constante para que guarde el estado de zustand en el almacenamiento local//
    (set, get) => ({
      items: [],

      addToCart: (product) => {//agregar productos al carro en base a id//
        const items = get().items.slice();
        const idx = items.findIndex((i) => i.id === product.id);
        if (idx >= 0) {
          items[idx] = {
            ...items[idx],
            quantity: (items[idx].quantity || 1) + 1,
          };
        } else {
          items.push({ ...product, quantity: 1 });
        }
        set({ items });
      },

      removeFromCart: (id) => {//remover productos del carro
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      increment: (id) => {//aumentar la cantidad de productos//
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
          ),
        });
      },

      decrement: (id) => {//disminuir la cantidad de productos//
        set({
          items: get()
            .items.map((i) =>
              i.id === id ? { ...i, quantity: (i.quantity || 1) - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        });
      },

      clearCart: () => set({ items: [] }),//limpiar el carro//

      // Drawer state para que el carro funcione como off canvas
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      // Getters
      getOrderData: () => {
        // Orden que serian mandados al backend
        const items = get().items;
        // Una vez obtenido los items se calcula el total
        const total = get().getTotal();

        //hacemos la funcion de retorno para pasar al mapeado que tomara los datos necesarios de la orden
        return {
          // MAP
          productos: items.map((item) => ({
            id: item.product.id, // id del item
            nombre: item.product.name, // Nombre del item
            precio: item.products.price, // Precio de la tienda
            cantidad: item.quantity, // Cantidad que desea
          })),
          total: total, // suma total de todo los items
          date: new Date().toISOString(), // La hora en el cual se completo el pedido
        };
      },

      getTotalItems: () =>
        get().items.reduce((s, it) => s + (it.quantity || 0), 0), //la cantida total de productos en el order
      getTotalPrice: () =>
        get().items.reduce(
          (s, it) => s + (it.price || 0) * (it.quantity || 0), //el precio total de todos los productos en el order
          0
        ),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;
