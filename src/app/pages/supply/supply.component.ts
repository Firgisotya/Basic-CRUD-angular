import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent {
  constructor(private appService: AppService) { }

    dt: any = [];

    ngOnInit(): void {
      this.appService.getSupply().subscribe((res: any) => {
        this.dt = res;
      });
    }

    deleteSupply(id: number){
      this.appService.deleteSupply(id).subscribe((res: any) => {
        this.dt = res.orders;
        this.dt.filter((item: any) => item.id !== id);
      })
      this.successAlert();
    }

    successAlert(){
    Swal.fire("Berhasil!", "Berhasil menghapus data transaksi!", "success")
  }
}
