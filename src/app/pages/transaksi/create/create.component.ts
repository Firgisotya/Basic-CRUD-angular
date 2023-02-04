import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category.model';
import { Brand, Product } from 'src/app/model/Product.model';
import { User } from 'src/app/model/Transaksi.model';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateTransaksiComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }
  form!: FormGroup;

  tempUser: User[] = [];
  tempProduct: Product[] = [];

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil menambahkan data transaksi baru!", "success")
  }

  ngOnInit(): void {
    //get data user
    this.appService.getUser().subscribe((res: any) => {
      this.tempUser = res.data;
  })
    //get data product
    this.appService.getProducts().subscribe((res: any) => {
      this.tempProduct = res.products;
  })

  this.form = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    productId: new FormControl('', [Validators.required]),
    qty: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required]),
  })

  }

  submit(){
    this.form.value.userId = parseInt(this.form.value.userId);
    this.form.value.productId = parseInt(this.form.value.productId);
    this.appService.storeTransaksi(this.form.value).subscribe((res: any) => {
      this.router.navigate(['/transaksi'])
    })

  }

}
