import { createContext, useContext } from "react";
import { Productos } from "../Models/Productos";

export const ProductosContext = createContext({
    listaProductos: [] as Productos[],
    setListaProductos: (productos: Productos[]) => { },
    agregarProducto: (producto: Productos) => { },
    eliminarProducto: (id: number) => { }
});

export const useProductosContext = () => {
    return useContext(ProductosContext);
};