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

  deleteBank(id: number){
    this.appService.deleteBank(id).subscribe((res: any) => {
      this.bank = res.banks;
      // this.bank.filter((item: any) => item.id !== id);
      this.appService.getBank().subscribe((res: any) => {
        this.bank = res.banks;
      })
    })
    this.successAlert();
  }

  successAlert(){
  Swal.fire("Berhasil!", "Berhasil menghapus data bank!", "success")
}

}
