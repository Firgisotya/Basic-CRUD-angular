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
  imageSrc: string = '';
  name!: string;
  image!: File;
  form!: FormGroup;
  bank: any = [];

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.appService.getBankById(this.id).subscribe((data: any) => {
      this.bank = data.banks;
      this.imageSrc = `http://localhost:5000/${this.bank.image}`
      console.log(this.bank)

     
  })
  this.form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),

  })
  }

  onFileChange(event: any) {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({
          image: reader.result,
          url: reader.result
        })
      }
    }

    this.image = event.target.files[0];
    console.log(this.image);
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('image', this.image);
    console.log(this.form.value)
    this.appService.updateBank(this.id, formData).subscribe((data: any) => {
      console.log('Succes Update')
      this.successAlert()
      this.router.navigate(['/bank'])
    })
  }

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil mengedit data bank!", "success")
  }
}
