import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Carrito } from "../menu/Producto";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SendProductsService {
  listaProductos: Carrito[] = [];
  constructor(private http: HttpClient,private toastrService:ToastrService) {}

  agregarProducto(producto: Carrito) {
    var data = this.listaProductos.find(function (element) {
      return element.idProducto == producto.idProducto;
    });
    if (data != null) {
      data.cantidad += 1;
      data.total = data.cantidad * data.precioUnitario;
    } else {
      this.listaProductos.push(producto);
    }
    this.toastrService.success("Producto añadido!")
    console.log(this.listaProductos);
  }
  
  getListaProductos() {
    return this.listaProductos;
  }
  
  setListaProductos(listaActualizada) {
    this.listaProductos = listaActualizada;
  }

  cambiarCantidad(producto: Carrito, cantidad: number) {
    var data = this.listaProductos.find(function (element) {
      return element.idProducto == producto.idProducto;
    });
    if (data != null) {
      data.cantidad = cantidad;
      data.total = data.cantidad * data.precioUnitario;
    }
  }
}

