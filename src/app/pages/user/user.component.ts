import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/model/User.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private appService: AppService) { }

    dt: any[] = [];

    ngOnInit(): void {
      this.appService.getUser().subscribe((res: any) => {
        this.dt = res.user;
      })
      this.appService.getAllBank().subscribe((res: any) => {

        console.log(res);
        
      })
    }

    deleteUser(id: number){
      this.appService.deleteUser(id).subscribe(() => {
        this.dt = this.dt.filter((item: any) => item.id !== id);
        this.appService.getUser().subscribe((res: any) => {
          this.dt = res.user;
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
    Swal.fire("Berhasil!", "Berhasil menghapus user!", "success")
  }
}
