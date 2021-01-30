import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../menu/menu";
import { ToastrService } from 'ngx-toastr';
import { Carrito, lstCarrito } from "./list-carrito";
import { AuthService } from "../auth-service/auth-service.component";
import { OnUsuario } from "../auth-service/auth-service";
import { Observable } from "rxjs";

@Injectable()
export class SendProductsService {

  usuarioLog: OnUsuario;
  private APIAddListaCarrito="http://localhost:5000/api/Pagos/AgregarAlCarrito"; 
  private APIgetListaCarrito="http://localhost:5000/api/Pagos/GetListaCarrito";
  private APIdeleteDeLista="http://localhost:5000/api/Pagos/EliminarDelCarrito";
  private APIgetTotalCarrito="http://localhost:5000/api/Pagos/GetTotalCarrito";
  private APIUpdateTotal="http://localhost:5000/api/Pagos/ActualizarTotal";
  private APIVaciarCarrito="http://localhost:5000/api/Pagos/VaciarCarrito";

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
      this.http.delete(this.APIdeleteDeLista+producto.idLista).subscribe(
      (res)=>{
        this.toastrService.success("Eliminado!");
      },(error)=>{
      }
    );
}

  cambiarCantidad(idproducto: number, cantidad: number): Observable<number> {
    this.usuarioLog = this.auth.getUser();
    return this.http.put<number>(this.APIUpdateTotal+"/"+this.usuarioLog.idusuario+"/"+idproducto+"/"+cantidad,null);
  }

  vaciarCarrito(): Observable<number> {
    this.usuarioLog = this.auth.getUser();
    return this.http.delete<number>(this.APIVaciarCarrito+"/"+this.usuarioLog.idusuario);
  }


}

