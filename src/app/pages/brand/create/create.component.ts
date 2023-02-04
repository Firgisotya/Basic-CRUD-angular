import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-brand',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateBrandComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }
  form!: FormGroup;

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil menambahkan data brand baru!", "success")
  }


  ngOnInit(): void {
   this.form = new FormGroup({
     name: new FormControl('', [Validators.required])
   })
  }
  submit(){
    this.appService.storeBrand(this.form.value).subscribe((data: any) => {
      this.router.navigate(['/brand'])
    })
  }
}
