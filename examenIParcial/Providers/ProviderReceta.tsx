import React, {useContext, useState} from "react";
import { ViewReact } from "../Modelos/ViewReact";
import {Receta} from "../Modelos/Receta";
import { View } from "react-native";
import { ContextReceta } from "../context/ContextReceta";


export default function ProviderReceta({children}: ViewReact) {
    const [receta, setReceta]= useState<Receta[]>([
        {id:"1",  platillo: "Salsa Alfredo", ingredientes: ["Leche", "nuez moscada", "queso", "Ajo", "mantequilla"], fecha: new Date() },
    ]);

    const agregarReceta = (platillo:string, ingredientes: string[], fecha: Date)=>{
        const nuevaReceta: Receta = {
            id: (receta.length+1).toString(),
            platillo: platillo,
            ingredientes: ingredientes,
            fecha: new Date()
        };
        setReceta([...receta, nuevaReceta]);
    };

    const eliminarReceta = (id: string) => {
        setReceta(receta.filter(platillo => platillo.id !== id))
    }

    const buscarReceta = (id: string) => { 
        const recetaBuscada = receta.find(platillo => platillo.id === id);
        if(recetaBuscada){
            alert(`Receta ${recetaBuscada.platillo} encontrada, ingredientes: ${recetaBuscada.ingredientes}`)
        }
        else {
            alert("No se encuentra la receta")
        }
        }

    return (
        <View>
            <ContextReceta.Provider value={{ receta, agregarReceta, eliminarReceta, buscarReceta }}>
                {children}
            </ContextReceta.Provider>
        </View>
    );
}

export const useRecetas = () => {
    return useContext(ContextReceta);
}