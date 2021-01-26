import { Component, OnInit } from "@angular/core";
import { SendProductsService } from "./sendProducts.service";
import { PagosService } from './pagos.service';
import { Carrito } from "./list-carrito";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  templateUrl: "./list-carrito.component.html",
})
export class listCarritoComponent implements OnInit {
  listaProductos: Carrito ;
  totalPedido: number;
  idorden: number;

  constructor(private carritoService: SendProductsService,
              private pagosService: PagosService,
              private router: Router,
              private toastrService: ToastrService,
              ) {              
  }


  ngOnInit() {
    this.carritoService.getListaCarrito().subscribe(
      (res: Carrito)=>{
      this.listaProductos=res;
    },(error)=>{console.log(error);})
    this.getTotalPago();

  }

  borrarProducto(producto) {
     this.carritoService.eliminarProductoDeLista(producto);
     window.location.reload()
  }

  ngAfterViewChecked() {
    window.scrollTo(0, 0);

    }


  getTotalPago() {
    this.carritoService.getTotalCarrito().subscribe(
      (res: number)=>{
      this.totalPedido=res;
    },(error)=>{console.log(error);}) 
  }


  cambiarTotal(producto) {
    var valor = +(document.getElementById("valor"+producto.idProducto) as HTMLInputElement).value;
    this.carritoService.cambiarCantidad(producto,valor);

  }

  pagarProductos(){
    if(window.confirm("Desea pagar ?")){
      this.enviarOrden();
      this.enviarOrdenDetalle();
      this.enviarCorreo();       
      this.toastrService.success("Compra realizada correctamente!\nSe te ha enviado un correo electronico de confirmacion");
      this.router.navigate(["/Home"]);

    }
  }

  enviarOrden(){
    return this.pagosService.enviarOrden(this.totalPedido).subscribe(
      (res:number ) => {
        this.idorden=res;
      },
      (error) => {console.log(error);});;

  }
  
  enviarOrdenDetalle(){
    setTimeout(()=>{
    this.pagosService.enviarOdenDetalle(this.listaProductos,this.idorden).subscribe(
      (res) => {},
      (error) => {console.log(error);});
    },2000);
  }

  enviarCorreo(){
    setTimeout(()=>{
    this.pagosService.enviarEmail(this.totalPedido,this.idorden).subscribe(
      (res) => {},
      (error) => {console.log(error);});
    },2000);
  }


}
