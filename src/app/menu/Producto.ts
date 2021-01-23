
export class newReviews{
    valoracion: number;
    mensaje: string;
    fecha: Date;
    idproducto: number;
}


export class newProduct{
    precio: number;
    nombre:string;
    Idmenu: number;
    descripcion: string;
    url: string;
    status:number;
}


export class Product{
    idproducto:number;
    precio: number;
    nombre:string;
    Idmenu: number;
    descripcion: string;
    url: string;
    status:number;
}

export class lstCarrito{
    idProducto:number;
    precio: number;
    nombre:string;
    IdMenu: number;
    descripcion: string;
    url: string;
}

export interface Carrito {
    idProducto: number;
    nombre: string;
    descripcion: string;
    precioUnitario: number;
    total: number;
    url: string;
    cantidad: number;
  }

