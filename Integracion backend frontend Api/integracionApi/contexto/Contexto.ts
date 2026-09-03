import { createContext } from "react";
import { Maestro } from "../Modelos/Maestro";
import { Clase } from "../Modelos/Clase";

export const ContextUniversidad = createContext({

    listaMaestros: [] as Maestro[],
    setListaMaestros: (maestros: Maestro[]) => { },
    agregarMaestro: (maestro: Maestro) => { }
})
