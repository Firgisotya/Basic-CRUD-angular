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
  brandSelected: any[] = [];
  categorySelected: any[] = [];
  brandValue: any;
  categoryValue: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.appService.getProductById(this.id).subscribe((data: any) => {
      this.prod = data.product;

      this.appService.getBrand().subscribe((data: any) => {
        this.tempBrand = data.brands;
        this.brandSelected = this.tempBrand.filter((brand: any) => {
        return brand.id == this.prod.brandId
      })
      this.brandValue = this.brandSelected[0].name
      console.log("INI BRAND SELECTED")
      console.log(this.brandValue)
      })






      this.appService.getCategory().subscribe((data: any) => {
        this.tempCategory = data.categories;
        this.categorySelected = this.tempCategory.filter((category: any) => {
          return category.id == this.prod.categoryId
        })
        console.log("INI CATEGORY SELECTED")
          console.log(this.categorySelected[0].id)
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
