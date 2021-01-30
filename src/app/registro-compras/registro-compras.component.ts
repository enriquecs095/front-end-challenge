import { Component } from '@angular/core';


@Component({

    templateUrl: './registro-compras.component.html'


})


export class RegistroComprasComponent{

    ngAfterViewChecked() {
        window.scrollTo(0, 0);
    
        }


}