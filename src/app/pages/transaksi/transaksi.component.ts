import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Transaksi } from 'src/app/model/Transaksi.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css']
})
export class TransaksiComponent {

  constructor(private appService: AppService) { }

    dt: Transaksi[] = [];

    ngOnInit(): void {
      this.appService.getTransaksi().subscribe((res: any) => {
        this.dt = res.transaksi;
      });
    }

    deleteTransaksi(id: number){
      this.appService.deleteTransaksi(id).subscribe((res: any) => {
        this.dt = res.transaksi;
        this.dt.filter((item: any) => item.id !== id);
      })
      this.successAlert();
    }

    successAlert(){
    Swal.fire("Berhasil!", "Berhasil menghapus data transaksi!", "success")
  }

}
