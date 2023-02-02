import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Product } from 'src/app/model/Product.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

    constructor(private appService: AppService) { }

    dt: Product[] = [];

    ngOnInit(): void {
      this.appService.getProducts().subscribe((res: any) => {
        this.dt = res.products;
      });
    }
}
