export interface Indicador{
    tipo: "Alimento" | "Energia" | "Animo";
    valor: number; 
}

export interface EntradaBitacora{
    mensaje: string;
    hora: string;
}