import { Component, OnInit } from "@angular/core";
import { ProductsListService } from "./Products.service";
import { ReviewsService } from "./Reviews.service";
import { SendProductsService } from "../compras/sendProducts.service";
import { AuthService } from '../auth-service/auth-service.component';
import {Product} from './Producto';

@Component({
  selector: "menu1-class",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class Menu1Component implements OnInit {
  lstProducts: any;
  lstReviews: any;
  url: string;
  nombre: string;
  id: string;
  range: string;
  comments: string;
  load:boolean=false;

  constructor(
    private productsList: ProductsListService,
    private reviews: ReviewsService,
    private carritoService: SendProductsService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    setTimeout(()=>{
    this.productsList.getProducts(1).subscribe(
      (res) => {
        this.lstProducts = res;
      },
      (error) => {
        console.log(error);
      }
    );
    this.load =true;
    },700
    )
  }

  showReviews(pr: Product) {
    this.url=pr.url;
    this.nombre=pr.nombre;
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
