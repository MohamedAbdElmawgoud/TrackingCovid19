import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../apiService/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({

    "email": new FormControl('', Validators.required),
    "password": new FormControl('', Validators.required),
  });
  constructor(private apiService : ApiService) { }

  ngOnInit() {
  }
 async submit(){
  if(this.loginForm.valid){ 
  
  let params = {...this.loginForm.value };

    await this.apiService.login(params)
    Swal.fire({
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
      title: "please enter valid data"
    })
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

}