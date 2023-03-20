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
        this.appService.deleteCategory(id).subscribe(() => {
          this.category = this.category.filter((item: any) => item.id !== id);
          this.appService.getCategory().subscribe((res: any) => {
            this.category = res.categories;
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
      Swal.fire("Berhasil!", "Berhasil menghapus data category!", "success")
    }

}
