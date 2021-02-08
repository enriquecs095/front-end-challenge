import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './menu';
import { Observable } from 'rxjs';


@Injectable()


export class ProductsListService{

    private APIProducts = 'https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/Menu/getProducts';

    constructor(private http : HttpClient){}

    getProducts(idMenu: number): Observable<Product>{
      return  this.http.get<Product>(this.APIProducts+idMenu)
    }



}




