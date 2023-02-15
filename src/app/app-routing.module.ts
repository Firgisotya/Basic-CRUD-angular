import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './pages/brand/brand.component';
import { CreateBrandComponent } from './pages/brand/create/create.component';
import { EditBrandComponent } from './pages/brand/edit/edit.component';
import { CategoryComponent } from './pages/category/category.component';
import { CreateCategoryComponent } from './pages/category/create/create.component';
import { EditCategoryComponent } from './pages/category/edit/edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateProductComponent } from './pages/product/create/create.component';
import { EditProductComponent } from './pages/product/edit/edit.component';
import { ProductComponent } from './pages/product/product.component';
import { ShowProductComponent } from './pages/product/show/show.component';
import { CreateTransaksiComponent } from './pages/transaksi/create/create.component';
import { EditTransaksiComponent } from './pages/transaksi/edit/edit.component';
import { ShowTransaksiComponent } from './pages/transaksi/show/show.component';
import { TransaksiComponent } from './pages/transaksi/transaksi.component';
import { CreateUserComponent } from './pages/user/create/create.component';
import { EditUserComponent } from './pages/user/edit/edit.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path:'', component: DashboardComponent },
  { path:'user', component: UserComponent },
  { path:'brand', component: BrandComponent },
  { path:'category', component: CategoryComponent },
  { path:'product', component: ProductComponent },
  { path:'transaksi', component: TransaksiComponent },
  { path:'user/create', component: CreateUserComponent },
  { path:'user/edit/:id', component: EditUserComponent },
  { path:'brand/create', component: CreateBrandComponent },
  { path:'brand/edit/:id', component: EditBrandComponent },
  { path:'category/create', component: CreateCategoryComponent },
  { path:'category/edit/:id', component: EditCategoryComponent },
  { path:'product/create', component: CreateProductComponent },
  { path:'product/edit/:id', component: EditProductComponent },
  { path:'product/show/:id', component: ShowProductComponent },
  { path:'transaksi/create', component: CreateTransaksiComponent },
  { path:'transaksi/edit/:id', component: EditTransaksiComponent },
  { path:'transaksi/show/:id', component: ShowTransaksiComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
