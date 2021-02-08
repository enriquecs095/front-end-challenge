import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newProduct, Product } from '../menu/menu';
import { Observable } from 'rxjs';

@Injectable()

export class ProductsAdminService{

constructor(private http: HttpClient){

}
private APIProductosByMenu = 'https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/ProductsAdmin/getProductsByMenu';
private APIProductosPorId = 'https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/ProductsAdmin/getProductById';
private APIEditProducto = 'https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/ProductsAdmin/putProduct';
private APIAddProducto = 'https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/ProductsAdmin/addProduct';
private APIDeleteProducto = 'https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/ProductsAdmin/deleteProduct';
private APIChangeStatus = 'https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/ProductsAdmin/ProductStatus';


getProductosByMenu(idMenu): Observable<Product[]>{
    return this.http.get<Product[]>(this.APIProductosByMenu+idMenu);
}

getProductById(id): Observable<Product> {
    return this.http.get<Product>(this.APIProductosPorId+id);
}

editProduct(form){
    return this.http.put<Product>(this.APIEditProducto,form);
}

addProduct(form){
    let data: newProduct=<newProduct>{"precio": +form.precio ,"nombre": form.nombre , "Idmenu": +form.Idmenu,
    "descripcion": form.descripcion,"url": form.url, "status": form.status};
    return this.http.post(this.APIAddProducto,data);
}

deleteProduct(id){
    return this.http.delete(this.APIDeleteProducto+(+id));
}

changeStatus(form: Product){
    return this.http.put(this.APIChangeStatus,form);
}


}

