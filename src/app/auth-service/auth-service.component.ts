import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { OnUsuario,Usuario_Nuevo, Usuario_Logging } from "./auth-service";
import { getUrlScheme } from "@angular/compiler";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Observer } from "rxjs";
import { ObserversModule } from "@angular/cdk/observers";


@Injectable()
export class AuthService {
  private API = "https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Admin/";

  user: OnUsuario;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}


 loginUser(usuario){
   setTimeout(()=>{
    this.getToken(usuario);
    this.getUserInfo(usuario);
   },500);
}

getToken(usuario: Usuario_Logging){
  this.http.post(this.API +"Login", usuario).subscribe(
    (response) => {
      const token=(<any>response).token
      sessionStorage.setItem("myserver.com",token);
    },
    (error) => {
    });
}


getUserInfo(usuario: Usuario_Logging){
  return this.http.post(this.API +"getUser", usuario).subscribe((response)=>{
      sessionStorage.setItem("myserver.com/server",JSON.stringify(response));
      this.toastr.success("Usuario Logueado Correctamente!", "Bienvenido!");
      this.router.navigate(["/Home"]);
  },(error)=>{
    this.toastr.warning("Error: Correo o contraseña Invalido", "Usuario!");
  });
}


  getUser(){
       return JSON.parse(sessionStorage.getItem('myserver.com/server'));
  }


  estaAutenticado() {
    const token = sessionStorage.getItem("myserver.com");
    this.user=this.getUser();
    if (token && this.user && !this.jwtHelper.isTokenExpired(token)){
      return  true;
     }else{
      return  false;
     }
  }
  

  esAdmin(){
     this.user = this.getUser();
    if(this.user.rol==2){
      return true;
    }
      return false;
  }



  logOut(){
    sessionStorage.removeItem("myserver.com");
    sessionStorage.removeItem('myserver.com/server');
    this.toastr.success("Sesion cerrada!", "Vuelve!");
    this.router.navigate(["/Home"]);

  }


  registrarUser(usuario: Usuario_Nuevo) {
    let hdrs = {
      headers: new HttpHeaders({
        Authorization: "My authorization"
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
