import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent {

  constructor(private appService: AppService) { }

  bank: any = [];

  ngOnInit(): void {
      this.appService.getBank().subscribe((res: any) => {
      this.bank = res.banks;
    });
  }

  deleteBank(id: number): void  {
      
    this.appService.deleteBank(id).subscribe(() => {
      this.bank = this.bank.filter((item: any) => item.id !== id);
      this.appService.getBank().subscribe((res: any) => {
        this.bank = res.banks;
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
  

    // this.appService.deleteBank(id).subscribe((res: any) => {
    //   this.bank = res.banks;
    //   this.bank.filter((item: any) => item.id !== id);
    //   this.appService.getBank().subscribe((res: any) => {
    //     this.bank = res.banks;
    //   })
    // })
    // this.successAlert();
  }

  successAlert(){
  Swal.fire("Berhasil!", "Berhasil menghapus data bank!", "success")
}

}
