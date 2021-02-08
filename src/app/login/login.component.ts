import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthService } from "../auth-service/auth-service.component";
import { Usuario_Logging } from "../auth-service/auth-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  correo:any;
  contrasena:any;

  onSubmit(form: Usuario_Logging) {
    this.authService.loginUser(form);
  }

  ngAfterViewChecked() {
    window.scrollTo(0, 0);

    }
    
}
