import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../apiService/api.service';
import Swal from 'sweetalert2'
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

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
  constructor(private apiService : ApiService , private storage : Storage ,private router : Router) { }

  ngOnInit() {
  }
 async submit(){
  if(this.loginForm.valid){ 
  
  let params = {...this.loginForm.value };

    let res = await this.apiService.login(params);
    let user = await this.apiService.getUser(res.id);

   await this.storage.set('user' , user)
    this.router.navigate(['tabs/profile'])
    Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
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