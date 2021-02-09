import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../menu/menu";
import { ToastrService } from 'ngx-toastr';
import { Carrito, lstCarrito } from "./list-carrito";
import { AuthService } from "../auth-service/auth-service.component";
import { OnUsuario } from "../auth-service/auth-service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class SendProductsService {

  usuarioLog: OnUsuario;
  private APIAddListaCarrito="https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Pagos/AgregarAlCarrito"; 
  private APIgetListaCarrito="https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Pagos/GetListaCarrito";
  private APIdeleteDeLista="https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Pagos/EliminarDelCarrito";
  private APIgetTotalCarrito="https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Pagos/GetTotalCarrito";
  private APIUpdateTotal="https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Pagos/ActualizarTotal";
  private APIVaciarCarrito="https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Pagos/VaciarCarrito";

  constructor(private http: HttpClient,
              private toastrService:ToastrService,
              private auth: AuthService,
              private router: Router) {}

  hdrs = {
      headers: new HttpHeaders({
        Authorization: "My authorization"
    }),
  };

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
    return this.http.get(this.APIgetListaCarrito+this.usuarioLog.idusuario,this.hdrs);
  }

  getTotalCarrito(){
    this.usuarioLog = this.auth.getUser();
    return this.http.get(this.APIgetTotalCarrito+this.usuarioLog.idusuario,this.hdrs);
  }
  

  eliminarProductoDeLista(producto: Carrito){
    this.usuarioLog = this.auth.getUser();
      this.http.delete(this.APIdeleteDeLista+"/"+producto.idproducto+"/"+this.usuarioLog.idusuario,this.hdrs).subscribe(
      (res)=>{
        window.location.reload();
      },(error)=>{
      }
    );
}

  cambiarCantidad(idproducto: number, cantidad: number): Observable<number> {
    this.usuarioLog = this.auth.getUser();
    return this.http.put<number>(this.APIUpdateTotal+"/"+this.usuarioLog.idusuario+"/"+idproducto+"/"+cantidad,this.hdrs);
  }

  vaciarCarrito(): Observable<number> {
    this.usuarioLog = this.auth.getUser();
    return this.http.delete<number>(this.APIVaciarCarrito+"/"+this.usuarioLog.idusuario,this.hdrs);
  }


}

