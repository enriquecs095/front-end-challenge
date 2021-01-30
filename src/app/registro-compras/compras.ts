export interface ListaOrden{
    idcliente:number;
    totalorden:number;
    fechaorden: Date;
  }

  export interface ListaOrdenDetalle{
    idProducto: number;
    nombre: string;
    cantidad: number;
    totalProducto: number;
    precio: number;
    url: string;
  }
