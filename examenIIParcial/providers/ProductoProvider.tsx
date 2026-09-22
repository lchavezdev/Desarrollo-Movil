import React, { useContext, useState } from 'react'
import { ProductosContext } from '../context/ProductosContext'
import { Productos } from '../Models/Productos';
import { ViewProps } from '../Models/ViewProps';

export default function ProviderProductos(children: ViewProps) {

    const [listaProductos, setListaProductos] = useState<Productos[]>([]);
    const ip = '192.168.1.11'

    const agregarProducto = async (producto: Productos) => {
        try {
            const response = await fetch(`http://${ip}:3000/productos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });

            const data = await response.json();
            console.log(data);

            alert('Producto agregado correctamente');

            const resListar = await fetch(`http://${ip}:3000/productos`);
            if (resListar.ok) {
                const dataLista = await resListar.json();
                setListaProductos(dataLista.data);
            }

        } catch (error) {
            alert('Error al agregar el producto: ' + (error as Error).message);
        }
    }

    // DELETE /items/:id
    const eliminarProducto = async (id: number) => {
        try {
            const response = await fetch(`http://${ip}:3000/items/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            console.log(data);

            alert('Producto eliminado correctamente');

            const resListar = await fetch(`http://${ip}:3000/productos`);
            if (resListar.ok) {
                const dataLista = await resListar.json();
                setListaProductos(dataLista.data);
            }

        } catch (error) {
            alert('Error al eliminar el producto: ' + (error as Error).message);
        }
    }

    return (
        <ProductosContext.Provider value={{ listaProductos, setListaProductos, agregarProducto, eliminarProducto }}>
            {children.children}
        </ProductosContext.Provider>
    )
}

export const useContextProductos = () => {
    return useContext(ProductosContext);
}