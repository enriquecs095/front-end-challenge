import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth-service/auth-service.component";
import { OnUsuario } from "../auth-service/auth-service";
import { ListaOrden } from "./compras";

@Component({
  templateUrl: "./registro-compras.component.html",
  styleUrls: ["./registro-compras.css"]
})


export class RegistroComprasComponent implements OnInit {
  listaOrdenes: ListaOrden;
  usuarioLog: OnUsuario;
  private API = "https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Admin/getOrder/";

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(){
    let hdrs = {
      headers: new HttpHeaders({
        Authorization: "My authorization"
    }),
  };
  
    this.usuarioLog=this.authService.getUser();
    this.http.post(this.API+this.usuarioLog.idusuario,hdrs).subscribe(
        (res: ListaOrden) => {
            this.listaOrdenes = res
        });
  }


}
