
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from "./navbar";
import { Observable } from 'rxjs';


@Injectable()

export class MenuService{

private APIgetMenu= "https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/Menu/getMenu";
constructor(private http : HttpClient){}


getMenu(): Observable<Menu>{
    let hdrs = {
        headers: new HttpHeaders({
          Authorization: "My authorization"
      }),
    };

    return this.http.get<Menu>(this.APIgetMenu,hdrs);
}

}

