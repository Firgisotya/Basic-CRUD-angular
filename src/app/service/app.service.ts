import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000';

  getBrand() {
    return this.http.get(`${this.baseUrl}/brand`);
  }
  storeBrand(data: any){
    return this.http.post(`${this.baseUrl}/brand`, data)
  }

  getCategory() {
    return this.http.get(`${this.baseUrl}/category`);
  }

  getProducts() {
    return this.http.get(`${this.baseUrl}/product`);
  }

  getTransaksi() {
    return this.http.get(`${this.baseUrl}/transaksi`);
  }

  getQty(){
    return this.http.get(`${this.baseUrl}/transaksi/qty`);
  }

  filterByMonth(month: any){
    console.log('DARI SERVICE')
    console.log(month)
    // mennerima parameter yang digunakan pada body
    return this.http.post(`${this.baseUrl}/transaksi/filterMonth`, month);
  }


}
