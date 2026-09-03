import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { ContextUniversidad } from '../contexto/Contexto'
import { Maestro } from '../Modelos/Maestro';

interface ViewProps {
    children: React.ReactNode;
}

export default function ProviderUniversidad(children: ViewProps) {

    const [listaMaestros, setListaMaestros] = useState<Maestro[]>([]);

    const agregarMaestro = async (maestro: Maestro) => {
        try {
            const response = await fetch('http://localhost:3000/maestros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(maestro)
            });
            
            const data = await response.json();
            console.log(data);
            
            alert('Maestro agregado correctamente');

            // Volvemos a consultar la lista actualizada del backend tras insertar
            const resListar = await fetch('http://localhost:3000/maestros');
            if (resListar.ok) {
                const dataLista = await resListar.json();
                setListaMaestros(dataLista);
            }

        } catch (error) {
            alert('Error al agregar el maestro: ' + (error as Error).message);
        }
    }

    return (
        <ContextUniversidad.Provider value={{ listaMaestros, setListaMaestros, agregarMaestro }}>
            {children.children}
        </ContextUniversidad.Provider>
    )
}

export const useContextUniversidad = () => {
    return useContext(ContextUniversidad);
}
