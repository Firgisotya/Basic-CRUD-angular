import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { Brand } from 'src/app/model/Product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditBrandComponent implements OnInit {

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { }

  id!: number;
  form!: FormGroup;
  brand!: Brand;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.appService.getBrandById(this.id).subscribe((data: any) => {
      this.brand = data.brands;
      console.log(this.brand)

      this.form = new FormGroup({
        name: new FormControl(this.brand.name, [Validators.required])

      })
  })

  }

  get f(){
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value)
    this.appService.updateBrand(this.id, this.form.value).subscribe((data: any) => {
      console.log('Succes Update')
      this.router.navigate(['/brand'])
    })
  }

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil mengedit data brand!", "success")
  }

}
