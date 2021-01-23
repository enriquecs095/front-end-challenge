import { Routes } from "@angular/router";
import { SlideShowComponent } from './slideshow/slideshow.component';
import { Menu1Component } from './menu/menu1.component';
import { Menu2Component } from './menu/menu2.component';
import { Menu3Component } from './menu/menu3.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { ProductsComponent } from './products-admin/products-admin.component';
import { EditProductComponent } from './products-admin/edit-product.component';
import { ProductRouterActivator } from './products-admin/products-router-activator.service';
import { AddProductComponent } from './products-admin/add-product.component';
import { listCarritoComponent } from './compras/list-carrito.component';
import { RegistroComprasComponent } from './registro-compras/registro.component';
import { DetalleOrdenComponent } from './registro-compras/detalle-orden/detalle.orden.component';
import { Menu4Component } from './menu/menu4.component';
import {PageNotFound} from './not-found/404-error.component'

export const AppRoutes: Routes = [
    {path: '', component: SlideShowComponent, pathMatch: 'full' },
    {path: 'Home', component: SlideShowComponent },
    {path: 'menu/Pizzas', component: Menu1Component},
    {path: 'menu/Bebidas', component: Menu2Component},
    {path: 'menu/Postres', component: Menu3Component},
    {path: 'menu/Promociones', component: Menu4Component},
    {path: 'Registro', component: RegistroComponent},
    {path: 'Login', component: LoginComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'products/edit/:id', component: EditProductComponent, canActivate: [ProductRouterActivator]},
    {path: 'products/new', component: AddProductComponent, canDeactivate: ['canDeactivateCreateProduct']},
    {path: 'Chat', component: ChatComponent},
    {path: 'carrito', component: listCarritoComponent},
    {path: 'listado', component: RegistroComprasComponent},
    {path: 'listado/detalle/:id', component: DetalleOrdenComponent},
    {path: 'Notfound', component: PageNotFound},
    { path: '404NotFound', component: PageNotFound },
    { path: '**', redirectTo: '404NotFound' },

]