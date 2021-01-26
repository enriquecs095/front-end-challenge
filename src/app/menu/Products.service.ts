import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()


export class ProductsListService{

    private APIProducts = 'http://localhost:5000/Menu/getProducts';

    constructor(private http : HttpClient){}

    getProducts(idMenu: number){
      return  this.http.get(this.APIProducts+idMenu)
    }



}




