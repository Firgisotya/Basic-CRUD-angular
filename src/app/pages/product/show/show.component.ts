import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { Brand, Product } from 'src/app/model/Product.model';
import Swal from 'sweetalert2';
import { Category } from 'src/app/model/Category.model';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowProductComponent {

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { }

    prod!: Product;
    id!: number;

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.appService.getProductById(this.id).subscribe((data: any) => {
        this.prod = data.product;
      })
    }

}
