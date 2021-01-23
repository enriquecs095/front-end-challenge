import {Component} from '@angular/core';
import { ProductsAdminService } from './products-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../menu/Producto';


@Component({
    templateUrl: './edit-product.component.html',
    styles:[
        `
        input{
            color: black;
        }
        textarea{
            color: black;
            
        }
        input, button, select, optgroup, textarea {
            margin: 0;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            width: 400px;
          }
          em {float:right; color:#E05C65; padding-left: 10px;}  

        `
    ]
})

export class EditProductComponent{
producto:Product;
nombre;
precio;
descripcion;
url;

constructor(private productsAdmin: ProductsAdminService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ){
}

ngOnInit(){
    this.productsAdmin.getProductById(+this.route.snapshot.params['id']).subscribe(res =>{
       this.producto=res;
    },error=>{ console.log(error); });
};


editProduct(form: Product,idproducto:number,idmenu:number,status:number){
    form.Idproducto=idproducto;
    form.Idmenu=idmenu;
    form.status=status;
    console.log(form);
    this.productsAdmin.editProduct(form).subscribe(res =>{
        },error=>{ console.log(error)});
        this.toastr.success("Se edito", "Hecho!")
        return this.router.navigate(['products']);

}

cancel(){
     return this.router.navigate(['products']);
}

}
