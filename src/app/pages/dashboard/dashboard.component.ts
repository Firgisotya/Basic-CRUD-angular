import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import {Chart, registerables} from 'chart.js/auto';
import { ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  seriesBrand: ApexAxisChartSeries;
  seriesCategory: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xbrand: any; //ApexXAxis;
  xcategory: any;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public chartOptions!: Partial<ChartOptions> | any;
    
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
    year: any[] = [];
    ttlYear: any[] = [];
    form! : FormGroup;

    //array month
    bulan_filter: any[] = ["January","February","March","April","May","June","July","August","September","Oktober","November","Desember"];
    selectedMonth: any;
    income: any = [];

    total: any = [];
    qty: any = [];
    month: any = [];
    newMonth: any = [];
    newQty: any = [];

    ttl: any[] = [];
    mnth: any = [];
    newMnth: any = [];

    //filterbrand
    fpb: any = [];
    brandId: any = [];
    jumfit: any = [];

    //filtercategory
    fpc: any = [];
    categoryId: any = [];
    jumfitc: any = [];

    //chart
    monthChart: any = [];
    chartByYear: any = [];

    filter!: FormGroup;

    ngOnInit() {
      this.filterProductChart();
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

      this.appService.filterOrderByYear(this.selectedYear).subscribe((data: any) => {
        this.total = data
        console.log(this.total);
        this.total.forEach((item: any) => {
          this.qty.push(item.Qty);
          this.month.push(item.bulan);
        })


        this.yearChart();


        })

        this.form = new FormGroup({
          year: new FormControl('')
        })

        this.appService.filterOrderByMonth(this.selectedMonth).subscribe((data: any) => {
          this.income = data;
          this.income.forEach((item: any) => {
            this.ttl.push(item.income);
            this.mnth.push(item.month);
          });

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

         this.Chart();

        })

      this.filter = new FormGroup({
        month : new FormControl(''),
      })
      
      this.appService.filterProductBrand().subscribe((data: any) => {
        this.fpb = data.query;
        this.fpb.forEach((item: any) => {
          this.brandId.push(item.name);
          this.jumfit.push(item.jumlah);
        })
        

        this.filterProductChart();
      })

      this.appService.filterProductCategory().subscribe((data: any) => {
        this.fpc = data.query;
        this.fpc.forEach((item: any) => {
          this.categoryId.push(item.name);
          this.jumfitc.push(item.jumlah);
        })
        console.log(this.categoryId);
        console.log(this.jumfitc);

        this.filterProductChart();
      })


    };

    filterByYear() {
      console.log(this.form.value);
      this.month = [];
      this.qty = [];
      this.appService.filterOrderByYear(this.form.value).subscribe((data: any) => {
        this.total = data
        this.total.forEach((item: any) => {
          this.qty.push(item.Qty);
          this.month.push(item.bulan);
        })

        if(this.chartByYear) {
          this.chartByYear.destroy();
        }

        this.yearChart();





      })

      

    }

    filterByMonth() {
      console.log(this.filter.value);

      // console.log(this.selectedMonth);
      this.ttl = [];
      this.mnth = [];
      this.appService.filterOrderByMonth(this.filter.value).subscribe((data: any) => {
        this.income = data
        console.log("data");
        console.log(this.income);



        this.income.forEach((item: any) => {
          this.ttl.push(item.income);
          this.mnth.push(item.month);
        })
        console.log(this.ttl);
        if(this.monthChart) {
          this.monthChart.destroy();
        }
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

        
        //   data: {
        //     labels: this.newMnth,
        //     datasets: [
        //       {
        //         label: 'Total Order',
        //         data: this.ttl,
        //         backgroundColor: [
        //           'rgba(255, 99, 132, 0.2)',
        //           'rgba(54, 162, 235, 0.2)',
        //           'rgba(255, 206, 86, 0.2)',
        //           'rgba(75, 192, 192, 0.2)',
        //           'rgba(153, 102, 255, 0.2)',
        //           'rgba(255, 159, 64, 0.2)'
        //         ],
        //         borderColor: [
        //           'rgba(255, 99, 132, 1)',
        //           'rgba(54, 162, 235, 1)',
        //           'rgba(255, 206, 86, 1)',
        //           'rgba(75, 192, 192, 1)',
        //           'rgba(153, 102, 255, 1)',
        //           'rgba(255, 159, 64, 1)'
        //         ],
        //         borderWidth: 1
        //       }
        //     ]
        //   },
        //   options: {
        //     scales: {
        //       y: {
        //         beginAtZero: true,
        //         max: 1000000
        //       }
        //     }
        //   }
        // });

        this.Chart();

      })



    }

    Chart() {
      this.monthChart = new Chart('monthOrder', {
          data: {
            datasets: [
              {
                type: 'line',
                label: 'Target Order',
                data: [2000000,2000000,2000000,2000000,2000000,2000000,2000000,2000000,2000000,2000000,2000000,2000000],
                borderColor: [
                  'rgba(12, 192, 192, 1)',
                ], 
                fill: false,},
              {
                type: 'bar',
                label: 'Month Order',
                data: this.ttl,
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgb(144, 200, 172)',
                  'rgb(115, 169, 173)',
                  'rgb(55, 48, 107)',
                  'rgb(158, 71, 132)',
                  'rgb(255, 172, 172)',
                  'rgb(255, 235, 180)'
                ],
            },
          ],
            labels: this.newMnth
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 3000000
            }
          }
        }
      });

    }

    yearChart() {
      this.chartByYear = new Chart('chartByYear', {
        data: {
          datasets: [
            {
              type: 'line',
              label: 'Target Order',
              data: [300,300,300,300,300,300,300,300,300,300,300,300],
              borderColor: [
                'rgba(12, 192, 192, 1)',
                
              ],
              fill: false,
                 
            },
            {
              type: 'bar',
              label: 'Month Order',
              data: this.qty,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgb(144, 200, 172)',
                'rgb(115, 169, 173)',
                'rgb(55, 48, 107)',
                'rgb(158, 71, 132)',
                'rgb(255, 172, 172)',
                'rgb(255, 235, 180)'
              ],
          }, 
        ],
          labels: this.month
      },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 500
            }
          }
        }
      });
    }

    filterProductChart(){
      this.chartOptions = {
        seriesBrand: [
          {
            name: "Total",
            data: this.jumfit
          }
        ],
        seriesCategory: [
          {
            name: "Total",
            data: this.jumfitc
          }
        ],
        annotations: {
          points: [
            {
              x: "Bananas",
              seriesIndex: 0,
              label: {
                borderColor: "#775DD0",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#775DD0"
                },
                text: "Bananas are good"
              }
            }
          ]
        },
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
  
        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"]
          }
        },
        xbrand: {
          labels: {
            rotate: -45
          },
          categories: this.brandId,
          tickPlacement: "on"
        },
        xcategory: {
          labels: {
            rotate: -45
          },
          categories: this.categoryId,
          tickPlacement: "on"
        },
        yaxis: {
          title: {
            text: "Total"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          }
        }
      };
    }

  }

