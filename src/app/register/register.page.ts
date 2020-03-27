import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COLORS_ARRAY } from '../Shared/colers'
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
  })
  colors = COLORS_ARRAY
  constructor() { }

  ngOnInit() {
  }

}
