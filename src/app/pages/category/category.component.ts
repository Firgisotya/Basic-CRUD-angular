import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

      constructor(private appService: AppService) { }

      category: any = [];

      ngOnInit(): void {
        this.appService.getCategory().subscribe((res: any) => {
          this.category = res.categories;
        });
      }

      deleteCategory(id: number){
        this.appService.deleteCategory(id).subscribe((res: any) => {
          this.category = res.categories;
          this.category.filter((item: any) => item.id !== id);
        })
        this.successAlert();
      }

      successAlert(){
      Swal.fire("Berhasil!", "Berhasil menghapus data category!", "success")
    }

}
