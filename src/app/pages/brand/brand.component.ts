import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {

    constructor(private appService: AppService) { }

    brand: any;

    ngOnInit(): void {
      this.appService.getBrand().subscribe((res: any) => {
        this.brand = res.brands;
      });
    }
}
