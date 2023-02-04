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
      this.appService.deleteBrand(id).subscribe((res: any) => {
        this.brand = res.brands;
        this.brand.filter((item: any) => item.id !== id);
      })
      this.successAlert();
    }

    successAlert(){
    Swal.fire("Berhasil!", "Berhasil menghapus data brand!", "success")
  }

}
