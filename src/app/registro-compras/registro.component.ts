import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth-service/auth-service.component";
import { OnUsuario } from "../auth-service/auth-service";
import { ListaOrden } from "./compras";

@Component({
  templateUrl: "./registro.component.html",
})
export class RegistroComprasComponent implements OnInit {
  listaOrdenes: ListaOrden;
  usuarioLog: OnUsuario;
  private API = "http://localhost:5000/api/Admin/getOrder/";

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(){
    this.usuarioLog=this.authService.getUser();
    this.http.post(this.API+this.usuarioLog.idusuario,null).subscribe(
        (res: ListaOrden) => {
            this.listaOrdenes = res
        },
        (error) => {},
        () => {
        
        }
      );
  }

  ngAfterViewChecked() {
    window.scrollTo(0, 0);

    }


}
