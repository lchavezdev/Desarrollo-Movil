
import React, { useContext, useState } from 'react'
import { ViewReact } from '../Modelos/ViewReact'
import { Estudiante } from '../Modelos/Estudiante'
import { View } from 'react-native';
import { ContextEstudiantes } from '../context/ContextEstudiantes';

export default function ProviderEstudiante({ children }: ViewReact) {
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
        { id: '1', name: 'Juan' },
        { id: '2', name: 'María' },
        { id: '3', name: 'Carlos' },
        { id: '4', name: 'Ana' },
        { id: '5', name: 'Luis' },
        { id: '6', name: 'Sofia' },
        { id: '7', name: 'Diego' },
        { id: '8', name: 'Lucía' },
        { id: '9', name: 'Pedro' },
        { id: '10', name: 'Elena' },
    ]);

    const agregarEstudiante = (name: string) => {
        const nuevoEstudiante: Estudiante = {
            id: (estudiantes.length + 1).toString(),
            name: name
        };
        setEstudiantes([...estudiantes, nuevoEstudiante]);

    }
    return (
        <View>
            <ContextEstudiantes.Provider value={{ estudiantes, agregarEstudiante }}>
                {children}
            </ContextEstudiantes.Provider>
        </View>
    )
}

export const useEstudiantes = () => {
    return useContext(ContextEstudiantes);
}