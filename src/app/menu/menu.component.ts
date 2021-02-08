import { Component, OnInit } from "@angular/core";
import { ProductsListService } from "./menu.service";
import { ReviewsService } from "./Reviews.service";
import { SendProductsService } from "../compras/sendProducts.service";
import { AuthService } from '../auth-service/auth-service.component';
import { Product } from './menu';
import { ActivatedRoute } from "@angular/router";

@Component({
  //selector: "menu-class",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]

})

export class MenuComponent implements OnInit {
  lstProducts: any;
  lstReviews: any;
  url: string;
  nombre: string;
  id: string;
  range: string;
  comments: string;
  load: boolean = false;
  load2:boolean=false;

  constructor(
    private productsList: ProductsListService,
    private reviews: ReviewsService,
    private carritoService: SendProductsService,
    public auth: AuthService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit() {
    setTimeout(() => {
      this.productsList.getProducts(+this.route.snapshot.params['id']).subscribe(
        (res) => {
          this.lstProducts = res;
        },
        (error) => {
        }
      );
    }, 800)
  }

  showReviews(pr: Product) {
    this.url = pr.url;
    this.nombre = pr.nombre;
    this.reviews.getReviews(pr.idproducto).subscribe(
      (res) => {
        this.lstReviews = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  agregarProducto(producto) {
    this.carritoService.agregarProducto(producto);
  }



}
