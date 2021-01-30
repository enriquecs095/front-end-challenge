import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { SlideShowComponent } from './slideshow/slideshow.component';
import { RegistroComponent } from './registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { SignalRService } from './chat/signalR.service';
import { AuthService } from './auth-service/auth-service.component';
import { AppRoutes } from './routes';
import { ProductsComponent } from './products-admin/products-admin.component';
import { EditProductComponent } from './products-admin/edit-product.component';
import { ProductRouterActivator } from './products-admin/products-router-activator.service';
import { AddProductComponent } from './products-admin/add-product.component';
import { ProductsListService } from './menu/menu.service';
import { ReviewsService } from './menu/Reviews.service';
import { ProductsAdminService } from './products-admin/products-admin.service';
import { listCarritoComponent } from './compras/list-carrito.component';
import { SendProductsService } from './compras/sendProducts.service';
import { PagosService } from './compras/pagos.service';
import { RegistroComprasComponent } from './registro-compras/registro.component';
import { DetalleOrdenComponent } from './registro-compras/detalle-orden/detalle.orden.component';
import {ArraySortPipe} from './sort/sort.pipe'
import {PageNotFound} from './not-found/404-error.component'
import { MenuService } from './navbar/navbar.service';
import { MenuRouterActivator } from './menu/menu-router-activator.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    FooterComponent,
    RegistroComponent,
    SlideShowComponent,
    LoginComponent,
    ChatComponent,
    ProductsComponent,
    EditProductComponent,
    AddProductComponent,
    listCarritoComponent,
    RegistroComprasComponent,
    DetalleOrdenComponent,
    ArraySortPipe,
    PageNotFound
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot(AppRoutes)
  ],
  exports:[RouterModule],
  providers: [SignalRService,AuthService,
    ProductsListService,ReviewsService,ProductsAdminService,ProductRouterActivator,MenuService,MenuRouterActivator,
    {provide: 'canDeactivateCreateProduct', useValue: checkForm},SendProductsService,PagosService
],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function checkForm(component: AddProductComponent ){
  if(component.isDirty()&& !component.isSave){
    return window.confirm("¿Seguro que desea salir del formulario?");
  }
  return true;
  }
  