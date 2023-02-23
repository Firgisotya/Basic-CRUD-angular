import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import {Chart, registerables} from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor(private appService: AppService, private detect: ChangeDetectorRef) {
      const currentYear = new Date().getFullYear();
      for (let i = 2020; i <= currentYear; i++) {
        this.tahun_filter.push(i);
      }
    }

    brand: any = [];
    category: any = [];
    product: any = [];
    order: any = [];

    sumBrand: number = 0;
    sumCategory: number = 0;
    sumProduct: number = 0;
    sumOrder: number = 0;

    chartOrder: any = [];
    monthOrder: any = [];

     // array of year
    tahun_filter: any[] = [];
    selectedYear: any;
    year: any[] = ["2022","2023"];
    form! : FormGroup;

    //array month
    bulan_filter: any[] = ["January","February","March","April","May","June","July","August","September","Oktober","November","Desember"];
    selectedMonth: any;
    income: any = [];

    yearSelect: any;
    total: any = [];
    qty: any = [];
    month: any = [];
    newMonth: any = [];
    newQty: any = [];

    ttl: any = [];
    mnth: any = [];
    mnth2: any = [];
    newMnth: any = [];
    newMnth2: any = [];
    newTtl: any = [];
    newIncome: any = [];

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

      // this.appService.filterOrderByYear(this.selectedYear).subscribe((data: any) => {
      //   this.total = data
      //   this.qty = this.total.map((item: any) => item.Qty);
      //   this.month = this.total.map((item: any) => item.bulan);

      //   this.chartOrder = new Chart('chartOrder', {
      //     type: 'bar',
      //     data: {
      //       labels: this.month,
      //       datasets: [
      //         {
      //           label: 'Total Order',
      //           data: this.qty,
      //           backgroundColor: [
      //             'rgba(255, 99, 132, 0.2)',
      //             'rgba(54, 162, 235, 0.2)',
      //             'rgba(255, 206, 86, 0.2)',
      //             'rgba(75, 192, 192, 0.2)',
      //             'rgba(153, 102, 255, 0.2)',
      //             'rgba(255, 159, 64, 0.2)'
      //           ],
      //           borderColor: [
      //             'rgba(255, 99, 132, 1)',
      //             'rgba(54, 162, 235, 1)',
      //             'rgba(255, 206, 86, 1)',
      //             'rgba(75, 192, 192, 1)',
      //             'rgba(153, 102, 255, 1)',
      //             'rgba(255, 159, 64, 1)'
      //           ],
      //           borderWidth: 1
      //         }
      //       ]
      //     },
      //     options: {
      //       scales: {
      //         y: {
      //           beginAtZero: true
      //         }
      //       }
      //     }
      //   });

      //   this.form = new FormGroup({
      //     year: new FormControl('')
      //   })
      //   })

        this.appService.filterOrderByMonth(this.selectedMonth).subscribe((data: any) => {
          this.income = data;
          console.log(this.income);

          this.ttl = this.income.map((item: any) => item.income);
          this.mnth = this.income.map((item: any) => item.month );

          this.newMnth = this.mnth.map((item: any) => {
            switch (item) {
              case 1:
                return "January";
              case 2:
                return "February";
              case 3:
                return "March";
              case 4:
                return "April";
              case 5:
                return "May";
              case 6:
                return "June";
              case 7:
                return "July";
              case 8:
                return "August";
              case 9:
                return "September";
              case 10:
                return "Oktober";
              case 11:
                return "November";
              case 12:
                return "Desember";
              default:
                return "Invalid month";
            }
          });


          this.monthOrder = new Chart('monthOrder', {
            type: 'bar',
            data: {
              labels: this.newMnth,
              datasets: [
                {
                  label: 'Total Order',
                  data: this.ttl,
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

          


        })

        this.form = new FormGroup({
          month: new FormControl('')
          
      })

      //splice

      // filterByYear(event: Event) {
      //   this.newMonth.splice(0);
      //   this.newQty.splice(0);
      //   this.selectedYear = (event.target as HTMLInputElement).value;
      //   console.log(this.selectedYear);
      //   this.appService.filterOrderByYear(this.selectedYear).subscribe((data: any) => {
      //     this.total = data
      //     console.log(this.total);
      //     this.newQty = this.total.map((item: any) => item.Qty);
      //     this.newMonth = this.total.map((item: any) => item.bulan);

      //     console.log(this.newQty);
      //     console.log(this.newMonth);


      //     this.chartOrder = new Chart('chartOrder', {
      //       type: 'bar',
      //       data: {
      //         labels: this.newMonth,
      //         datasets: [
      //           {
      //             label: 'Total Order',
      //             data: this.newQty,
      //             backgroundColor: [
      //               'rgba(255, 99, 132, 0.2)',
      //               'rgba(54, 162, 235, 0.2)',
      //               'rgba(255, 206, 86, 0.2)',
      //               'rgba(75, 192, 192, 0.2)',
      //               'rgba(153, 102, 255, 0.2)',
      //               'rgba(255, 159, 64, 0.2)'
      //             ],
      //             borderColor: [
      //               'rgba(255, 99, 132, 1)',
      //               'rgba(54, 162, 235, 1)',
      //               'rgba(255, 206, 86, 1)',
      //               'rgba(75, 192, 192, 1)',
      //               'rgba(153, 102, 255, 1)',
      //               'rgba(255, 159, 64, 1)'
      //             ],
      //             borderWidth: 1
      //           }
      //         ]
      //       },
      //       options: {
      //         scales: {
      //           y: {
      //             beginAtZero: true
      //           }
      //         }
      //       }
      //     });

          


      //   })

      // }

    };

    filterByMonth(event: Event) {
      this.selectedMonth = (event.target as HTMLInputElement).value;
      console.log("selected");
      console.log(this.selectedMonth);
      this.appService.filterOrderByMonth(this.selectedMonth).subscribe((data: any) => {
        this.newIncome = data
        
        console.log(this.newIncome);

      })
    }

  }

