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

  imageSrc: string = '';
  url = 'http://localhost:5000/images/';

    image!: File;


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
      this.appService.getBrand().subscribe((data: any) => {
        this.tempBrand = data.brands;
      })

      this.appService.getCategory().subscribe((data: any) => {
        this.tempCategory = data.categories;
      })

      this.appService.getProductById(this.id).subscribe((data: any) => {
        this.prod = data.product;
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

    this.appService.updateProduct(this.id, formData).subscribe((data: any) => {
      console.log('Succes Update')
      this.router.navigate(['/product'])
    })
  }

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil mengedit data product!", "success")
  }

}
