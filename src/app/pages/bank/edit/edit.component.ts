import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditBankComponent {
  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { }

  id!: number;
  form!: FormGroup;
  bank: any = [];

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.appService.getBankById(this.id).subscribe((data: any) => {
      this.bank = data.banks;
      console.log(this.bank)

      this.form = new FormGroup({
        name: new FormControl(this.bank, [Validators.required])

      })
  })
  }

  get f(){
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value)
    this.appService.updateBank(this.id, this.form.value).subscribe((data: any) => {
      console.log('Succes Update')
      this.router.navigate(['/bank'])
    })
  }

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil mengedit data bank!", "success")
  }
}
