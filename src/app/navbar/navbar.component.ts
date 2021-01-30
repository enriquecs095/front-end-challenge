import {
  Component,
  Input,
  OnInit
} from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
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
  show:boolean=false;
  lstMenu: any;
  //load:boolean=false;
  
  constructor(
     private auth: AuthService,
     private menuService: MenuService,
     private router: ActivatedRoute) {
     }
     
     
  ngOnInit() {
    this.user = this.auth.getUser();

    setTimeout(()=>{
    this.menuService.getMenu().subscribe(
      (res)=>{
        this.lstMenu=res;
      },
      (error)=> {
        console.log(error);
      });
      this.show=true;
     // this.load=true;
    },800
    )
  }


  Logout() {
    this.auth.logOut();
  }
}
