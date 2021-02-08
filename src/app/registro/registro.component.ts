import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth-service.component';
import { Usuario_Nuevo } from '../auth-service/auth-service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private API = 'https://4w3x1gpo88.execute-api.us-west-2.amazonaws.com/Prod/api/Admin/Registro';

  constructor(private toastr: ToastrService,private router:Router,private authService:AuthService) { }

  user = new FormGroup({
    correo: new FormControl(''),
    nombre: new FormControl(''),
    contrasena: new FormControl('')
  });
  ngOnInit() {
  }

  onSubmit(form) {
    var usuario: Usuario_Nuevo = <Usuario_Nuevo>{
      correo: form.correo,
      contrasena: form.contrasena,
      nombre: form.nombre,
    };
    this.authService.registrarUser(usuario);
  }

  ngAfterViewChecked() {
    window.scrollTo(0, 0);

    }
}

