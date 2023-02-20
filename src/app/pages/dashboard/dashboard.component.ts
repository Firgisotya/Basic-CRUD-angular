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
    order: any = [];

    sumBrand: number = 0;
    sumCategory: number = 0;
    sumProduct: number = 0;
    sumOrder: number = 0;

    chartOrder: any = [];

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
    catName: any = [];


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
      this.appService.getOrder().subscribe((data: any) => {
        this.order = data.orders;
        this.sumOrder = this.order.length;
      });

      this.appService.filterOrderByMonth(this.bulanSelect).subscribe((data: any) => {
        this.total = data.filter
        this.total.forEach((element: any) => {
          this.firstName.push(element.username);
          this.prodName.push(element.productName);
          this.qty.push(element.Qty);
        })
        this.chartOrder = new Chart('chartOrder', {
          type: 'bar',
          data: {
            labels: this.prodName,
            datasets: [{
              label: 'Order',
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


    this.appService.filterOrderByMonth(this.form.value.month).subscribe((data: any) => {
      console.log('DATA')
      console.log(data.filter)
      this.newTotal = data.filter
      this.newTotal.forEach((element: any) => {
        this.newProdName.push(element.productName);
        this.newQty.push(element.Qty);
      })
      console.log(this.newProdName)
      if(this.chartOrder != null) {
        this.chartOrder.destroy();
      }

      this.chartOrder = new Chart('chartOrder', {
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
