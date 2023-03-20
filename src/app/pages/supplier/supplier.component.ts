import { Component } from '@angular/core';
import { AppService} from 'src/app/service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {

  constructor(private appService: AppService) { }

  dt: any = [];

  ngOnInit(): void {
    this.appService.getSupplier().subscribe((res: any) => {
      this.dt = res.suppliers;
      console.log(this.dt)
    })
  }

  deleteUser(id: number){
    this.appService.deleteSupplier(id).subscribe(() => {
      this.dt = this.dt.filter((item: any) => item.id !== id);
      this.appService.getSupplier().subscribe((res: any) => {
        this.dt = res.suppliers;
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
  Swal.fire("Berhasil!", "Berhasil menghapus supplier!", "success")
}

}
