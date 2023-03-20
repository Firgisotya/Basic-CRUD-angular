import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Product } from 'src/app/model/Product.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

    constructor(private appService: AppService) { }

    dt: Product[] = [];
    url = 'http://localhost:5000/images/';

    ngOnInit(): void {
      this.appService.getProducts().subscribe((res: any) => {
        this.dt = res.products;
      });
    }

    deleteProduct(id: number){
      this.appService.deleteProduct(id).subscribe(() => {
        this.dt = this.dt.filter((item: any) => item.id !== id);
        this.appService.getProducts().subscribe((res: any) => {
          this.dt = res.product;
        })
        this.successAlert();
      }, (err) => {
        // tangani error menggunakan sweetalert jika data masih memiliki relasi dengan tabel lain
        if (err.status === 400) {
          Swal.fire('Error', 'Data has related records and cannot be deleted', 'error');
        } else {
          // tampilkan pesan error menggunakan sweetalert jika terjadi error lain
          Swal.fire('Error', 'Failed to delete data', 'error');
        }
      }
      )
    }

    successAlert(){
    Swal.fire("Berhasil!", "Berhasil menghapus data product!", "success")
  }

}
