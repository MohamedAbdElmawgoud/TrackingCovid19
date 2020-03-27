import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../apiService/api.service';

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
    let params = {...this.loginForm.value };

    await this.apiService.login(params)
  }

}