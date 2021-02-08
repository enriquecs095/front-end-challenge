import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth-service/auth-service.component";
import { Router } from "@angular/router";
import { Orden } from "./list-carrito";
import { OnUsuario } from "../auth-service/auth-service";

@Injectable()
export class PagosService {
  usuarioLog: OnUsuario

  private APIOrden = "https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Pagos/IngresarOrden";
  private APIOrdenDetalle = "https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Pagos/IngresarOrdenDetalle";
  private APIEMAIL = "https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Pagos/enviarEmail";

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

hdrs = {
    headers: new HttpHeaders({
      Authorization: "My authorization"
  }),
};


 enviarOrden(total: number){
      this.usuarioLog = this.authService.getUser();
      var Orden_Producto: Orden = {
      idcliente:  this.usuarioLog.idusuario,
      totalorden: total
      }
      return this.http.post<number>(this.APIOrden, Orden_Producto,this.hdrs);
}


enviarOdenDetalle(idorden: number){
  this.usuarioLog = this.authService.getUser();
  return this.http.post<number>(this.APIOrdenDetalle+"/"+this.usuarioLog.idusuario+"/"+idorden,this.hdrs);
}


enviarEmail(total:number, idorden: number){
  this.usuarioLog = this.authService.getUser();
  return this.http.post<number>(this.APIEMAIL +"/"+this.usuarioLog.correo+"/"+idorden+"/"+total,this.hdrs);
}



}
