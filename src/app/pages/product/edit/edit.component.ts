import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { Brand, Product } from 'src/app/model/Product.model';
import Swal from 'sweetalert2';
import { Category } from 'src/app/model/Category.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditProductComponent implements OnInit{

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { }

  id!: number;
  form!: FormGroup;
  prod!: Product;
  tempBrand: Brand[] = [];
  tempCategory: Category[] = [];
  name: any;
  brandId: any;
  categoryId: any;
  price: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
      this.appService.getBrand().subscribe((data: any) => {
        this.tempBrand = data.brands;
      })

      this.appService.getCategory().subscribe((data: any) => {
        this.tempCategory = data.categories;
      })

      this.appService.getProductById(this.id).subscribe((data: any) => {
        this.name = data.product.name;
        this.brandId = data.product.brandId;
        this.categoryId = data.product.categoryId;
        this.price = data.product.price;
        this.form = new FormGroup({
          name: new FormControl(this.prod.name, [Validators.required]),
          brandId: new FormControl(this.prod.brandId, [Validators.required]),
          categoryId: new FormControl(this.prod.categoryId, [Validators.required]),
          price: new FormControl(this.prod.price, [Validators.required]),
        })
  })
  }
  get f(){
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value)
    this.appService.updateProduct(this.id, this.form.value).subscribe((data: any) => {
      console.log('Succes Update')
      this.router.navigate(['/product'])
    })
  }

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil mengedit data product!", "success")
  }

}
