export interface lstCarrito{
    idusuario: number;
    idproducto: number;
    cantidad: number;
}


export interface Carrito {
    idLista:number;
    idproducto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    url: string;
    cantidad: number;
  }

  export interface Orden{
    idcliente:number;
    totalorden:number;

  }

  