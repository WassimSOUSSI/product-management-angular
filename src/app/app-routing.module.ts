import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent,children:[
    {path:'',component:ProductsComponent},
    {path:"products",component:ProductsComponent},
    {path:"addProduct",component:AddProductComponent},
    {path:"editProduct/:id",component:EditProductComponent}
    ],canActivate:[LoginGuard]},
  {path:"",component:LoginComponent}, // Or {path:"", redirectTo:"products", pathMatch:"full"} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
