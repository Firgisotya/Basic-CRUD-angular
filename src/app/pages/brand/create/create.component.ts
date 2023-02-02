import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }
  form!: FormGroup;


  ngOnInit(): void {
   this.form = new FormGroup({
     name: new FormControl('', [Validators.required])
   })
  }
  submit(){
    console.log(this.form.value)
    this.appService.storeBrand(this.form.value).subscribe((data: any) => {
      this.router.navigate(['/brand'])
    })
  }
}
