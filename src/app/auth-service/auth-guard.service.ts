import { Injectable } from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import { ToastrService } from "ngx-toastr";

@Injectable()

export  class AuthGuard implements CanActivate{

    constructor (private router: Router, private jwtHelper: JwtHelperService, private toastr: ToastrService){

    }

    canActivate(){
        const token =sessionStorage.getItem("myserver.com");
       if (token && !this.jwtHelper.isTokenExpired(token)){
         return  true
        }
        this.toastr.warning("Por favor inicie sesion nuevamente", "Usuario!");
        this.router.navigate(["/Home"]);
        return false;
    }

}