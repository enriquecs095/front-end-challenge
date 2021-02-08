import { Component, OnInit } from "@angular/core";
import { SendProductsService } from "./sendProducts.service";
import { PagosService } from './pagos.service';
import { Carrito } from "./list-carrito";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Component({
  templateUrl: "./list-carrito.component.html",
  styleUrls: ["./list-carrito.component.css"],
})
export class listCarritoComponent implements OnInit {
  listaProductos: Carrito ;
  totalPedido: number=0;
  idorden: any;
  load:boolean=false;
  nuevaCantidad: number;

  constructor(private carritoService: SendProductsService,
              private pagosService: PagosService,
              private router: Router,
              private toastrService: ToastrService,
              private sendProduct: SendProductsService,
              ) {              
  }


  ngOnInit() {
    this.getLista();
    this.getTotalPago();

  }

  getLista(){
    this.carritoService.getListaCarrito().subscribe(
      (res: Carrito)=>{
      this.listaProductos=res;
    },(error)=>{console.log(error);})
  }

  borrarProducto(producto) {
     this.carritoService.eliminarProductoDeLista(producto);
     window.location.reload()
  }


  getTotalPago() {
    this.carritoService.getTotalCarrito().subscribe(
      (res: number)=>{
      this.totalPedido=res;
    },(error)=>{console.log(error);}) 
  }


  cambiarTotal(idproducto:number, cantidad:number, event:string) {
     if(cantidad==1 && event=="minus"){
       return;
     }
     this.nuevaCantidad=cantidad;
     (event=='plus') ? this.nuevaCantidad++ :  this.nuevaCantidad--;
    this.carritoService.cambiarCantidad(idproducto,this.nuevaCantidad).subscribe(
      (res)=>{
      },(error)=>{
      }
    );
    setTimeout(()=>{
       this.getTotalPago();
       this.getLista();
    },1000);


  }

  pagarProductos(){
    if(window.confirm("Desea pagar ?")){
      this.enviarOrden();
    }
  }

  enviarOrden():Observable<any>{
    setTimeout(()=>{
     this.pagosService.enviarOrden(this.totalPedido).subscribe(
      (res) => {
        this.idorden=res;
        this.enviarOrdenDetalle();
        this.enviarCorreo();     
        this.vaciarCarrito();  
      });
    },2000)
    return this.idorden;
  }
  
  enviarOrdenDetalle(){
    this.pagosService.enviarOdenDetalle(this.idorden).subscribe(
      (res) => {});
  }

  enviarCorreo(){
    this.pagosService.enviarEmail(this.totalPedido,this.idorden).subscribe(
      (res) => {
        this.toastrService.success("Compra realizada correctamente!\nSe te ha enviado un correo electronico de confirmacion");
        this.router.navigate(["/Home"]);
      });
  }

  vaciarCarrito(){
      this.sendProduct.vaciarCarrito().subscribe(
        (res) => {});
  }


}
