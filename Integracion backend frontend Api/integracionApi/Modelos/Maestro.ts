import { Clase } from "./Clase";

export interface Maestro {
    id?: number;
    nombre: string;
    Clases?: Clase[]; 
}
