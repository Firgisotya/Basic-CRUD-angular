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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.appService.getProductById(this.id).subscribe((data: any) => {
      this.prod = data.product;
      console.log("INI PROD")
      console.log(this.prod)

      this.appService.getBrand().subscribe((data: any) => {
        this.tempBrand = data.brands;
        console.log("INI BRAND")
        console.log(this.tempBrand)
      })

      this.appService.getCategory().subscribe((data: any) => {
        this.tempCategory = data.categories;
        console.log("INI CATEGORY")
        console.log(this.tempCategory)
      })

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
