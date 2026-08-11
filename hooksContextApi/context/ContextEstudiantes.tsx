import { createContext } from "react";

export const ContextEstudiantes = createContext({
    estudiantes: [
        {id: '1', name: 'Juan' },
        { id: '2', name: 'María' },
        { id: '3', name: 'Carlos' },
        { id: '4', name: 'Ana' },
        { id: '5', name: 'Luis' },
        { id: '6', name: 'Sofia' },
        { id: '7', name: 'Diego' },
        { id: '8', name: 'Lucía' },
        { id: '9', name: 'Pedro' },
        { id: '10', name: 'Elena' },
    ],
    agregarEstudiante: (name: string) =>{}
})