import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category.model';
import { Brand } from 'src/app/model/Product.model';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }
  form!: FormGroup;

  tempBrand: any[] = [];
  tempCategory: any[] = [];
  dataBrand: Brand[] = [];
  dataCategory: Category[] = [];


  successAlert(){
    Swal.fire("Berhasil!", "Berhasil menambahkan data product baru!", "success")
  }

  ngOnInit(): void {
    //get data brand
    this.appService.getBrand().subscribe((res: any) => {
      this.tempBrand = res.brands;
  })

  //get data category
  this.appService.getCategory().subscribe((res: any) => {
    this.tempCategory = res.categories;
  })

  this.form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brandId: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  })


}

  submit(){
    this.form.value.brandId = parseInt(this.form.value.brandId);
    this.form.value.categoryId = parseInt(this.form.value.categoryId);
    this.appService.storeProduct(this.form.value).subscribe((res: any) => {
      this.router.navigate(['/product'])
    })

  }

}
