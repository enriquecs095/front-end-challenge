
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from "./navbar";
import { Observable } from 'rxjs';


@Injectable()

export class MenuService{

private APIgetMenu= "http://localhost:5000/Menu/getMenu";
constructor(private http : HttpClient){}


getMenu(): Observable<Menu>{
    return this.http.get<Menu>(this.APIgetMenu);
}

}

