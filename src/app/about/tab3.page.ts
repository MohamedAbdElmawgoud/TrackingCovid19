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
  screen=true;
  contactForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'phone': new FormControl('', [Validators.required]),
    "mail": new FormControl('', [Validators.required , Validators.email]),
    "message": new FormControl('', [Validators.required]),


  });

  constructor(private api: ApiService) {}
  changeScreen(status:number){
    if(status == 0){
      this.screen= false;
     
    }else{
      this.screen=true;
    }
    
    return this.screen
     }

   
    async  submit(){
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
