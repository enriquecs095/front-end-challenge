import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth-service/auth-service.component";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Carrito, Orden } from "./list-carrito";
import { OnUsuario } from "../auth-service/auth-service";
import { Observable } from "rxjs";

@Injectable()
export class PagosService {
  usuarioLog: OnUsuario

  private APIOrden = "http://localhost:5000/api/Pagos/IngresarOrden";
  private APIOrdenDetalle = "http://localhost:5000/api/Pagos/IngresarOrdenDetalle";
  private APIEMAIL = "http://localhost:5000/api/Pagos/enviarEmail";

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

//  ingresarCompra(listaProductos: Carrito, total: number) {

 // }

 enviarOrden(total: number): Observable<number>{
      this.usuarioLog = this.authService.getUser();
      var Orden_Producto: Orden = {
      idcliente:  this.usuarioLog.idusuario,
      totalorden: total
      }
      return this.http.post<number>(this.APIOrden, Orden_Producto);
}

enviarOdenDetalle(listaProductos: Carrito,idorden:number): Observable<number>{
  /*var Orden_Producto_Detalle: OrdenDetalle = {
    idproducto: listaProductos.idproducto,
    idordenesproducto: this.idOrden,
    cantidad: listaProductos.cantidad,
  };*/
  return this.http.post<number>(this.APIOrdenDetalle+idorden, listaProductos);
}


enviarEmail(total:number, idorden: number): Observable<number>{
  this.usuarioLog = this.authService.getUser();
  return this.http.post<number>(this.APIEMAIL +"/"+this.usuarioLog.correo+"/"+idorden+"/"+total,null);
}

/*
  EnviarEmail(correo) {
    this.http.post(this.APIEMAIL, correo).subscribe(
      (res) => {},
      (error) => {},
      () => {}
    );
  }*/
}
