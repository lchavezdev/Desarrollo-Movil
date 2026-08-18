import { createContext } from "react";

export const ContextReceta = createContext({
    receta: [
        {id:"1",  platillo: "Salsa Alfredo", ingredientes: ["Leche", "nuez moscada", "queso", "Ajo", "mantequilla"], fecha: new Date() },
    ],
    agregarReceta: (platillo: string, ingredientes: string[], fecha: Date) => {},
    eliminarReceta: (id: string)=> {},
    buscarReceta: (id: string)=> {}
})