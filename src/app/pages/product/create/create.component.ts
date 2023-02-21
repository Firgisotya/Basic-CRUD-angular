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
  imageSrc: string = '';
  url = 'http://localhost:5000/images/';

  tempBrand: any[] = [];
  tempCategory: any[] = [];
  dataBrand: Brand[] = [];
  dataCategory: Category[] = [];

  image!: File;


  successAlert() {
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
      image: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
    })

  }

  onFileChange(event: any) {

    // if(event.target.files.length > 0){
    //   const image = event.target.files[0];
    //   this.form.patchValue({
    //     image: image
    //   })
    // }




    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({
          image: reader.result,
          url: reader.result
        })
      }
    }

    this.image = event.target.files[0];
    console.log(this.image);
  }

  submit() {

    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('brandId', this.form.value.brandId);
    formData.append('categoryId', this.form.value.categoryId);
    formData.append('price', this.form.value.price);
    formData.append('image', this.image, this.image.name);
    formData.append('url', this.url + this.image.name);
    console.log(this.form.value);

    this.appService.storeProduct(formData).subscribe((res: any) => {
      console.log(res);
      this.successAlert();
      this.router.navigate(['/product']);
    })

  }

}
