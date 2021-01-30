import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ProductsListService } from './menu.service';

@Injectable()

export class MenuRouterActivator implements CanActivate{

constructor(private router:Router, private productList: ProductsListService){}


canActivate(route : ActivatedRouteSnapshot){

    this.productList.getProducts(+route.params['id']).subscribe(res =>{
       let existeMenu=!!res;
        if(!existeMenu)
            this.router.navigate(['/Notfound']);
    },error=>{ 
        console.log(error);

    });
    return true;
}


}