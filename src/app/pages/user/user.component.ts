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
    }

    deleteUser(id: number){
      this.appService.deleteUser(id).subscribe((res: any) => {
        this.dt = res.user;
        this.dt.filter((item: any) => item.id !== id);
      })
      this.successAlert();
    }

    successAlert(){
    Swal.fire("Berhasil!", "Berhasil menghapus user!", "success")
  }
}
