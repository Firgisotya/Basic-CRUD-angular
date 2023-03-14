import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BrandComponent } from './pages/brand/brand.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { TransaksiComponent } from './pages/transaksi/transaksi.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateBrandComponent } from './pages/brand/create/create.component';
import { EditBrandComponent } from './pages/brand/edit/edit.component';
import { CreateCategoryComponent } from './pages/category/create/create.component';
import { EditCategoryComponent } from './pages/category/edit/edit.component';
import { CreateProductComponent } from './pages/product/create/create.component';
import { EditProductComponent } from './pages/product/edit/edit.component';
import { CreateTransaksiComponent } from './pages/transaksi/create/create.component';
import { EditTransaksiComponent } from './pages/transaksi/edit/edit.component';
import { UserComponent } from './pages/user/user.component';
import { ShowProductComponent } from './pages/product/show/show.component';
import { ShowTransaksiComponent } from './pages/transaksi/show/show.component';
import { CreateUserComponent } from './pages/user/create/create.component';
import { EditUserComponent } from './pages/user/edit/edit.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { SupplyComponent } from './pages/supply/supply.component';
import { BankComponent } from './pages/bank/bank.component';
import { CreateBankComponent } from './pages/bank/create/create.component';
import { EditBankComponent } from './pages/bank/edit/edit.component';
import { CreateSupplyComponent } from './pages/supply/create/create.component';
import { EditSupplyComponent } from './pages/supply/edit/edit.component';
import { CreateSupplierComponent } from './pages/supplier/create/create.component';
import { EditSupplierComponent } from './pages/supplier/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    BrandComponent,
    CategoryComponent,
    ProductComponent,
    TransaksiComponent,
    DashboardComponent,
    CreateBrandComponent,
    EditBrandComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CreateProductComponent,
    EditProductComponent,
    ShowProductComponent,
    CreateTransaksiComponent,
    EditTransaksiComponent,
    ShowTransaksiComponent,
    UserComponent,
    CreateUserComponent,
    EditUserComponent,
    BankComponent,
    CreateBankComponent,
    EditBankComponent,
    SupplierComponent,
    CreateSupplierComponent,
    EditSupplierComponent,
    SupplyComponent,
    CreateSupplyComponent,
    EditSupplyComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
