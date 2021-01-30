import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './menu';
import { Observable } from 'rxjs';


@Injectable()


export class ProductsListService{

    private APIProducts = 'http://localhost:5000/Menu/getProducts';

    constructor(private http : HttpClient){}

    getProducts(idMenu: number): Observable<Product>{
      return  this.http.get<Product>(this.APIProducts+idMenu)
    }



}




