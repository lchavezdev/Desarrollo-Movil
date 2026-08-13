import { createContext, useContext } from "react";
import { Indicador, EntradaBitacora } from "../Modelos/MascotaInterface";

export const MascotaContext = createContext({
    nombre: 'Pixel',
    cambiarNombre: (nuevoNombre: string) => {}, // Funcion expuesta para editar el nombre
    indicadores: [
        { tipo: 'Alimento', valor: 60 },
        { tipo: 'Energia', valor: 60 },
        { tipo: 'Animo', valor: 60 }
    ] as Indicador[],
    estadoAnimo: 'Normal',
    necesitaAyuda: false,
    puedeJugar: true,
    modoNoche: false,
    bitacora: [] as EntradaBitacora[],
    alternarModoNoche: () => {},
    alimentar: () => {},
    jugar: () => {},
    descansar: () => {},
    reiniciar: () => {}
});

export const useMascota = () => {
    return useContext(MascotaContext);
};
