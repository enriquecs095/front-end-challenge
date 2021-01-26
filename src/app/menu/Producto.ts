
export interface newReviews{
    valoracion: number;
    mensaje: string;
    fecha: Date;
    idproducto: number;
}


export interface newProduct{
    precio: number;
    nombre:string;
    Idmenu: number;
    descripcion: string;
    url: string;
    status:number;
}


export interface Product{
    idproducto:number;
    precio: number;
    nombre:string;
    Idmenu: number;
    descripcion: string;
    url: string;
    status:number;
}


