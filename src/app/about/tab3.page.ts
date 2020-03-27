import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "src/app/apiService/api.service";

import Swal from 'sweetalert2'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  contant: any;
  appInfo = [];
  screen = true;
  contactForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    "email": new FormControl('', [Validators.required , Validators.email]),
    'phone': new FormControl('', [Validators.required]),
    "content": new FormControl('', [Validators.required]),


  });

  constructor(private api: ApiService) {}

  async ngOnInit() {
    this.contant=await this.api.contactUs(this.contactForm.value)
  this.appInfo = await this.api.appInfo(1);
    console.log(this.appInfo)
  }

  changeScreen(status:number){
    if(status == 0){
      this.screen= false;
     
    }else{
      this.screen=true;
    }
    
    return this.screen
     }

   
    async  submit(){
      console.log(this.contactForm.value)
      if(this.contactForm.valid){
      try{  await this.api.contactUs(this.contactForm.value);
        this.contactForm.patchValue({})
  
        Swal.fire({
          icon: 'success',
    showConfirmButton: false,
    timer: 1500
        })
        }
        
        catch (e) {
          Swal.fire({
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
            title: "please enter valid data"
          })
        }
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
