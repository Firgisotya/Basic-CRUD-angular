import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Order } from 'src/app/model/Order.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css']
})
export class TransaksiComponent {

  constructor(private appService: AppService) { }

    dt: Order[] = [];

    ngOnInit(): void {
      this.appService.getOrder().subscribe((res: any) => {
        this.dt = res.orders;
      });
    }

    deleteTransaksi(id: number){
      this.appService.deleteOrder(id).subscribe((res: any) => {
        this.dt = res.orders;
        this.dt.filter((item: any) => item.id !== id);
      })
      this.successAlert();
    }

    successAlert(){
    Swal.fire("Berhasil!", "Berhasil menghapus data transaksi!", "success")
  }

}
