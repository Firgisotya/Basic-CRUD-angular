import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { Category } from 'src/app/model/Category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { }

  id!: number;
  form!: FormGroup;
  cat!: Category;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.appService.getCategoryById(this.id).subscribe((data: any) => {
      this.cat = data.categories;
      console.log(this.cat)

      this.form = new FormGroup({
        name: new FormControl(this.cat.name, [Validators.required])

      })
  })

  }

  get f(){
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value)
    this.appService.updateCategory(this.id, this.form.value).subscribe((data: any) => {
      console.log('Succes Update')
      this.router.navigate(['/category'])
    })
  }

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil mengedit data category!", "success")
  }

}
