import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:5000';

  //User
  getUser() {
    return this.http.get(`${this.baseUrl}/users`);
  }
  getUserById(id: any){
    return this.http.get(`${this.baseUrl}/users/${id}`)
  }
  storeUser(data: any){
    return this.http.post(`${this.baseUrl}/users`, data)
  }
  updateUser(id: any, data: any){
    return this.http.put(`${this.baseUrl}/users/${id}`, data)
  }
  deleteUser(id: any){
    return this.http.delete(`${this.baseUrl}/users/${id}`)
  }

  //Banks
  getBank() {
    return this.http.get(`${this.baseUrl}/bank`);
  }
  storeBank(data: any){
    return this.http.post(`${this.baseUrl}/bank`, data)
  }
  getBankById(id: any){
    return this.http.get(`${this.baseUrl}/bank/${id}`)
  }
  updateBank(id: any, data: any){
    return this.http.put(`${this.baseUrl}/bank/${id}`, data)
  }
  deleteBank(id: any){
    return this.http.delete(`${this.baseUrl}/bank/${id}`)
  }


  //Brand
  getBrand() {
    return this.http.get(`${this.baseUrl}/brand`);
  }
  storeBrand(data: any){
    return this.http.post(`${this.baseUrl}/brand`, data)
  }
  getBrandById(id: any){
    return this.http.get(`${this.baseUrl}/brand/${id}`)
  }
  updateBrand(id: any, data: any){
    return this.http.put(`${this.baseUrl}/brand/${id}`, data)
  }
  deleteBrand(id: any){
    return this.http.delete(`${this.baseUrl}/brand/${id}`)
  }


//Category
  getCategory() {
    return this.http.get(`${this.baseUrl}/category`);
  }
  storeCategory(data: any){
    return this.http.post(`${this.baseUrl}/category`, data)
  }
  getCategoryById(id: any){
    return this.http.get(`${this.baseUrl}/category/${id}`)
  }
  updateCategory(id: any, data: any){
    return this.http.put(`${this.baseUrl}/category/${id}`, data)
  }
  deleteCategory(id: any){
    return this.http.delete(`${this.baseUrl}/category/${id}`)
  }


  //Product
  getProducts() {
    return this.http.get(`${this.baseUrl}/product`);
  }
  storeProduct(data: any){
    return this.http.post(`${this.baseUrl}/product`, data)
  }
  getProductById(id: number){
    return this.http.get(`${this.baseUrl}/product/${id}`)
  }
  updateProduct(id: any, data: any){
    return this.http.put(`${this.baseUrl}/product/${id}`, data)
  }
  deleteProduct(id: any){
    return this.http.delete(`${this.baseUrl}/product/${id}`)
  }

  //Supplier
  getSupplier() {
    return this.http.get(`${this.baseUrl}/supplier`);
  }
  storeSupplier(data: any){
    return this.http.post(`${this.baseUrl}/supplier`, data)
  }
  getSupplierById(id: any){
    return this.http.get(`${this.baseUrl}/supplier/${id}`)
  }
  updateSupplier(id: any, data: any){
    return this.http.put(`${this.baseUrl}/supplier/${id}`, data)
  }
  deleteSupplier(id: any){
    return this.http.delete(`${this.baseUrl}/supplier/${id}`)
  }


  //supply
  getSupply() {
    return this.http.get(`${this.baseUrl}/supply`);
  }
  storeSupply(data: any){
    return this.http.post(`${this.baseUrl}/supply`, data)
  }
  getSupplyById(id: any){
    return this.http.get(`${this.baseUrl}/supply/${id}`)
  }
  updateSupply(id: any, data: any){
    return this.http.put(`${this.baseUrl}/supply/${id}`, data)
  }
  deleteSupply(id: any){
    return this.http.delete(`${this.baseUrl}/supply/${id}`)
  }


  //Order
  getOrder() {
    return this.http.get(`${this.baseUrl}/order`);
  }
  storeOrder(data: any){
    return this.http.post(`${this.baseUrl}/order`, data)
  }
  getOrderById(id: any){
    return this.http.get(`${this.baseUrl}/order/${id}`)
  }
  deleteOrder(id: any){
    return this.http.delete(`${this.baseUrl}/order/${id}`)
  }



  //Filter
  getQty(){
    return this.http.get(`${this.baseUrl}/transaksi/qty`);
  }
  filterProductBrand(){
  return this.http.get(`${this.baseUrl}/filterProduct/brand`);
  }
  filterProductCategory(){
    return this.http.get(`${this.baseUrl}/filterProduct/category`);
  }
  filterOrderByYear(year: any){
    console.log("service");
    console.log(year);
    return this.http.post(`${this.baseUrl}/filterOrder/year`, year);
  }
  filterOrderByMonth(month: any){
    console.log("service");
    console.log(month);
    return this.http.post(`${this.baseUrl}/filterOrder/month`, month);
  }


}
