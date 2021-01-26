import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../menu/Producto";
import { ToastrService } from 'ngx-toastr';
import { Carrito, lstCarrito } from "./list-carrito";
import { AuthService } from "../auth-service/auth-service.component";
import { OnUsuario } from "../auth-service/auth-service";

@Injectable()
export class SendProductsService {

  usuarioLog: OnUsuario;
  private APIAddListaCarrito="http://localhost:5000/api/Pagos/AgregarAlCarrito"; 
  private APIgetListaCarrito="http://localhost:5000/api/Pagos/GetListaCarrito";
  private APIdeleteDeLista="http://localhost:5000/api/Pagos/EliminarDelCarrito";
  private APIgetTotalCarrito="http://localhost:5000/api/Pagos/GetTotalCarrito";

  constructor(private http: HttpClient,
              private toastrService:ToastrService,
              private auth: AuthService) {}


  agregarProducto(producto: Product) {
    this.usuarioLog = this.auth.getUser();
    var addProduct: lstCarrito = <lstCarrito>{
      idusuario: this.usuarioLog.idusuario,
      idproducto: producto.idproducto,
  };

 this.http.post<lstCarrito>(this.APIAddListaCarrito,addProduct).subscribe(
    (res)=>{
      (res) ? this.toastrService.success("Producto añadido!") : 
      this.toastrService.success("Producto ya esta en el carrito!", "Usuario!");
    },(error)=>{
     
    }
 );
  }
  
  getListaCarrito() {
    this.usuarioLog = this.auth.getUser();
    return this.http.get(this.APIgetListaCarrito+this.usuarioLog.idusuario);
  }

  getTotalCarrito(){
    this.usuarioLog = this.auth.getUser();
    return this.http.get(this.APIgetTotalCarrito+this.usuarioLog.idusuario);
  }
  

  eliminarProductoDeLista(producto: Carrito){
    this.usuarioLog = this.auth.getUser();
    console.log(producto);
      this.http.delete(this.APIdeleteDeLista+producto.idLista).subscribe(
      (res)=>{
        this.toastrService.success("Eliminado!");
      },(error)=>{
  }
);
  }



  cambiarCantidad(producto: Carrito, cantidad: number) {
    /*var data = this.listaProductos.find(function (element) {
      return element.idProducto == producto.idProducto;
    });
    if (data != null) {
      data.cantidad = cantidad;
      data.total = data.cantidad * data.precio;
    }*/
  }
}

