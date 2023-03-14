import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User.model';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateUserComponent implements OnInit{

  constructor(private appService: AppService, private router: Router) { }
  form!: FormGroup;

  users: User[] = [];
  banks: any = [];

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil menambahkan data user baru!", "success")
  }


  ngOnInit(): void {
    this.appService.getBank().subscribe((data: any) => {
      this.banks = data.banks;
      console.log(this.banks[0].image)

    })

   this.form = new FormGroup({
     firstName: new FormControl('', [Validators.required]),
     lastName: new FormControl('', [Validators.required]),
     username: new FormControl('', [Validators.required]),
     email: new FormControl('', [Validators.required]),
     bankId: new FormControl('', [Validators.required]),

   })
  }
  submit(){
    this.appService.storeUser(this.form.value).subscribe((data: any) => {
      this.router.navigate(['/user'])
    })
  }

}
