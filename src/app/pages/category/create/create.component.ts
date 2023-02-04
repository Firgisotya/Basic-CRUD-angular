import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }
  form!: FormGroup;

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil menambahkan data category baru!", "success")
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
   }
   submit(){
     this.appService.storeCategory(this.form.value).subscribe((data: any) => {
       this.router.navigate(['/category'])
     })
   }

}
