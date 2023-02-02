import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor(private appService: AppService) { }

    brand: any = [];
    category: any = [];
    product: any = [];
    transaksi: any = [];

    sumBrand: number = 0;
    sumCategory: number = 0;
    sumProduct: number = 0;
    sumTransaksi: number = 0;

    chartTransaksi: any = [];

     // array of month
    month: any[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    bulanSelect: any = [];
    total: any = [];
    firstName: any = [];
    prodName: any = [];
    qty: any = [];
    form!: FormGroup;
    newMonth: any = [];
    newQty: any = [];
    newProdName: any = [];
    newTotal:any = [];


    ngOnInit() {
      this.appService.getBrand().subscribe((data: any) => {
        this.brand = data.brands;
        this.sumBrand = this.brand.length;
      });
      this.appService.getCategory().subscribe((data: any) => {
        this.category = data.categories;
        this.sumCategory = this.category.length;
      });
      this.appService.getProducts().subscribe((data: any) => {
        this.product = data.products;
        this.sumProduct = this.product.length;
      });
      this.appService.getTransaksi().subscribe((data: any) => {
        this.transaksi = data.transaksi;
        this.sumTransaksi = this.transaksi.length;
      });

      this.appService.filterByMonth(this.bulanSelect).subscribe((data: any) => {
        this.total = data.filter[0]
        this.total.forEach((element: any) => {
          this.firstName.push(element.username);
          this.prodName.push(element.productName);
          this.qty.push(element.Qty);
        })
        this.chartTransaksi = new Chart('chartTransaksi', {
          type: 'bar',
          data: {
            labels: this.prodName,
            datasets: [{
              label: 'Transaksi',
              data: this.qty,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });


      this.form = new FormGroup({
        month: new FormControl('')
    });
    }

    filterByMonth(){
      this.newProdName.splice(0)
    this.newQty.splice(0)
    // if (this.form.value.month == 'January') {
    //   this.form.value.month = 1
    // } else if (this.form.value.month == 'February') {
    //   this.form.value.month = 2
    // } else if (this.form.value.month == 'March') {
    //   this.form.value.month = 3
    // } else if (this.form.value.month == 'April') {
    //   this.form.value.month = 4
    // } else if (this.form.value.month == 'May') {
    //   this.form.value.month = 5
    // } else if (this.form.value.month == 'June') {
    //   this.form.value.month = 6
    // } else if (this.form.value.month == 'July') {
    //   this.form.value.month = 7
    // } else if (this.form.value.month == 'August') {
    //   this.form.value.month = 8
    // } else if (this.form.value.month == 'September') {
    //   this.form.value.month = 9
    // } else if (this.form.value.month == 'October') {
    //   this.form.value.month = 10
    // } else if (this.form.value.month == 'November') {
    //   this.form.value.month = 11
    // } else if (this.form.value.month == 'December') {
    //   this.form.value.month = 12
    // }


    this.appService.filterByMonth(this.form.value.month).subscribe((data: any) => {
      console.log('DATA')
      console.log(data.filter[0])
      this.newTotal = data.filter[0]
      this.newTotal.forEach((element: any) => {
        this.newProdName.push(element.productName);
        this.newQty.push(element.Qty);
      })
      console.log(this.newProdName)
      if(this.chartTransaksi != null) {
        this.chartTransaksi.destroy();
      }

      this.chartTransaksi = new Chart('chartTransaksi', {
        type: 'bar',
        data: {
          labels: this.newProdName,
          datasets: [{
            label: 'Transaksi',
            data: this.newQty,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

    }
}
