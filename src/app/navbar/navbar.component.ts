import {
  Component,
  OnInit,
} from "@angular/core";
import { Usuario, AuthService } from "../auth-service/auth-service.component";
import { LoginComponent } from "../login/login.component";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],

})
export class NavbarComponent implements OnInit {
  user : Usuario
  collapse: boolean = true;
  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getUser();
     console.log(this.auth.getUser());
  }
  Logout() {
    this.auth.user = null;
  }
}
