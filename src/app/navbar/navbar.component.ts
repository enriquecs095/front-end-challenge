import {
  Component,
  OnInit
} from "@angular/core";
import { AuthService } from "../auth-service/auth-service.component";
import { MenuService } from "./navbar.service";

@Component({
  selector: "app-home",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],

})
export class NavbarComponent implements OnInit {
  user : string;
  collapse: boolean = true;
  lstMenu: any;


  constructor(
     private auth: AuthService,
     private menuService: MenuService) {
     }
     
     

  ngOnInit() {
    this.user = this.auth.getUser();
    this.menuService.getMenu().subscribe(
      (res)=>{
        this.lstMenu=res;
      },
      (error)=> {
        console.log(error);
      });
  }

  Logout() {
    this.auth.logOut();
  }
}
