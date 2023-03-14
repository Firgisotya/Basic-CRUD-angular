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
    this.appService.deleteUser(id).subscribe((res: any) => {
      this.dt = res.user;
      this.dt.filter((item: any) => item.id !== id);
    })
    this.successAlert();
  }

  successAlert(){
  Swal.fire("Berhasil!", "Berhasil menghapus supplier!", "success")
}

}
