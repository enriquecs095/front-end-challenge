import { HttpHeaders } from "@angular/common/http";
import {
  Component,
  Input,
  OnInit
} from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth-service/auth-service.component";
import { Menu } from "./navbar";
import { MenuService } from "./navbar.service";

@Component({
  selector: "app-home",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],

})
export class NavbarComponent implements OnInit {
  collapse: boolean = true;
  show:boolean=false;
  lstMenu: any;
  
  constructor(
     private auth: AuthService,
     private menuService: MenuService,
     private router: ActivatedRoute) {
     }
     
     
  ngOnInit(): Observable<Menu> {

    setTimeout(()=>{
    this.menuService.getMenu().subscribe(
      (res)=>{
        this.lstMenu=res;
      },
      (error)=> {
        console.log(error);
      });
      this.show=true;
    },500
    )
    return this.lstMenu;
  }


  Logout() {
    this.auth.logOut();
  }
}
