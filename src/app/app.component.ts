import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent implements OnInit {
  disabled: boolean = true;
  load:boolean=false;

  isWeb(){
    return this.disabled;
  }


  ngOnInit(){
    setTimeout(()=>{
      this.load=true;
    },600)
  }

  
    
}



