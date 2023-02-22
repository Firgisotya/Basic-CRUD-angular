import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor(private appService: AppService, private detect: ChangeDetectorRef) { }

    brand: any = [];
    category: any = [];
    product: any = [];
    order: any = [];
    selected: any = '2020';

    sumBrand: number = 0;
    sumCategory: number = 0;
    sumProduct: number = 0;
    sumOrder: number = 0;

    chartOrder: any = [];

     // array of year
    year: any[] = ["2022","2023"];
    form! : FormGroup;

    yearSelect: any = [];
    total: any = [];
    qty: any = [];
    month: any = [];
    newMonth: any = [];
    newQty: any = [];

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

      this.appService.filterOrderByYear(this.yearSelect).subscribe((data: any) => {
        this.total = data
        this.qty = this.total.map((item: any) => item.Qty);
        this.month = this.total.map((item: any) => item.bulan);


        this.chartOrder = new Chart('chartOrder', {
          type: 'bar',
          data: {
            labels: this.month,
            datasets: [
              {
                label: 'Total Order',
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
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        this.form = new FormGroup({
          year: new FormControl('')
        })
        })

       

      }

      filterByYear() {
        
        this.yearSelect = this.form.value.year;
        this.detect.detectChanges();
        console.log(this.selected);
        this.appService.filterOrderByYear(this.yearSelect).subscribe((data: any) => {
          this.total = data
          this.newQty = this.total.map((item: any) => item.Qty);
          this.newMonth = this.total.map((item: any) => item.bulan);
          

          
        })
        
      }

    };
    

    
  
