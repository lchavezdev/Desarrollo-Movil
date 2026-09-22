export interface Productos {
    id?: number;
    nombre: string;
    descripcion: string;
    precio: number | string;
    estado: 'Disponible' | 'No disponible';
    categoria: string;
    urlFotografia: string;
}