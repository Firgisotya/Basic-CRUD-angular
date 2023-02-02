import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './pages/brand/brand.component';
import { CreateComponent } from './pages/brand/create/create.component';
import { EditComponent } from './pages/brand/edit/edit.component';
import { ShowComponent } from './pages/brand/show/show.component';
import { CategoryComponent } from './pages/category/category.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { TransaksiComponent } from './pages/transaksi/transaksi.component';

const routes: Routes = [
  { path:'dashboard', component: DashboardComponent },
  { path:'brand', component: BrandComponent },
  { path:'category', component: CategoryComponent },
  { path:'product', component: ProductComponent },
  { path:'transaksi', component: TransaksiComponent },
  { path:'brand/create', component: CreateComponent },
  { path:'brand/edit/:id', component: EditComponent },
  { path:'brand/show/:id', component: ShowComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
