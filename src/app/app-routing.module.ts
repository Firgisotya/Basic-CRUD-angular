import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './pages/brand/brand.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
