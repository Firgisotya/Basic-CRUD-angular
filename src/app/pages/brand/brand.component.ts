import { Component } from '@angular/core';
import { Brand } from 'src/app/model/Product.model';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {

    constructor(private appService: AppService) { }

    brand: any = [];

    ngOnInit(): void {
      this.appService.getBrand().subscribe((res: any) => {
        this.brand = res.brands;
        console.log(this.brand);
      });
    }

    deleteBrand(id: number){
      this.appService.deleteBrand(id).subscribe(() => {
        this.brand = this.brand.filter((item: any) => item.id !== id);
        this.appService.getBrand().subscribe((res: any) => {
          this.brand = res.brands;
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
    Swal.fire("Berhasil!", "Berhasil menghapus data brand!", "success")
  }

}
