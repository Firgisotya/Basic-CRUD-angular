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
export class CreateBankComponent {
  constructor(private appService: AppService, private router: Router) { }
  form!: FormGroup;
  imageSrc: string = '';
  image!: File;
  url = '/bank/';

  successAlert(){
    Swal.fire("Berhasil!", "Berhasil menambahkan data bank baru!", "success")
  }


  ngOnInit(): void {
   this.form = new FormGroup({
     name: new FormControl('', [Validators.required]),
     image: new FormControl('', [Validators.required])
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
    console.log(this.image);
    
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('image', this.image, this.image.name);
    console.log(this.form.value);
    console.log(formData);
    

    this.appService.storeBank(formData).subscribe((res: any) => {
      console.log(res);
      this.successAlert();
      this.router.navigate(['/bank']);
    })

  }
}
