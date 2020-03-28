import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COLORS_ARRAY } from '../Shared/colers'
import { ApiService } from '../apiService/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm = new FormGroup({
    "firstName": new FormControl('', Validators.required),
    "lastName": new FormControl('', Validators.required),
    "gender": new FormControl('', Validators.required),
    "address": new FormControl('', Validators.required),
    "workAddress": new FormControl('', Validators.required),
    "email": new FormControl('', Validators.required),
    "password": new FormControl('', Validators.required),
    "colorId": new FormControl('', Validators.required)
  });
  file;
  colors = COLORS_ARRAY
  constructor(private apiService : ApiService) { }

  ngOnInit() {
  }
 async submit(){
if(this.registerForm.valid){
    let params = {...this.registerForm.value , imageName : this.file};
    let form = new FormData();
    Object.keys(params).forEach(ele => {

            form.append(ele, params[ele])
            

    })
    Swal.fire({
      icon: 'success',
showConfirmButton: false,
timer: 1500
    })
    await this.apiService.register(form)
  } 
  
  else{
    Swal.fire({
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
      title: "please enter valid data"
    })
    
  }

  }


  uploadFile($event){
    this.file = $event.target.files[0];
    
  }
}
