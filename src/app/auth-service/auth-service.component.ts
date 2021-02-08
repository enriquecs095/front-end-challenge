import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { OnUsuario,Usuario_Nuevo, Usuario_Logging } from "./auth-service";

@Injectable()
export class AuthService {
  private API = "https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Admin/";
  user: OnUsuario;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  loginUser(usuario: Usuario_Logging) {
    let hdrs = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.post<OnUsuario>(this.API +"Login", usuario, hdrs).subscribe(
      (res: OnUsuario) => {
        this.user = res;
      },
      (error) => {
        this.toastr.warning("Error: Correo o contraseña Invalido", "Usuario!");
      },
      () => {
        if (this.user[0].rol == 1) {
          this.toastr.success("Usuario Logueado Correctamente!", "Bienvenido!");
        } else if (this.user[0].rol == 2) {
          this.toastr.success(
            "Administrador Logeado Correctamente!",
            "Bienvenido!"
          );
        }
        sessionStorage.setItem('user_log',JSON.stringify(this.user[0]));
        this.router.navigate(["/Home"]);
      }
    );
  }
  
  getUser() {
    return  JSON.parse(sessionStorage.getItem('user_log'));
  }

  estaAutenticado() {
    return sessionStorage.length>0 ? true :false;
  }
  
  esAdmin(){
    let usuario: OnUsuario=JSON.parse(sessionStorage.getItem('user_log'));
    return usuario.rol==2 ? true :false;
  }

  logOut(){
    sessionStorage.clear();
    this.toastr.success("Sesion cerrada!", "Vuelve!");
    this.router.navigate(["/Home"]);

  }

  registrarUser(usuario: Usuario_Nuevo) {
    let hdrs = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.post<Usuario_Nuevo>(this.API+"Registro", usuario, hdrs).subscribe(
      (res) => {
        this.toastr.success("Usuario creado Correctamente!", "Bienvenido!");
        this.router.navigate(["/Login"]);
      },
      (error) => {
        this.toastr.warning("Error: Correo electronico ya existe", "Usuario!");
      },
      () => {
        this.router.navigate(["/Login"]);

      }
    );
  }
}
