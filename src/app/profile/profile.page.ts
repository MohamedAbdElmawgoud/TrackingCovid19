import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/apiService/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
user;
gender;
img;
  constructor(private api: ApiService,) { }

  async ngOnInit() {
    this.user=await this.api.getUser(3);
    console.log(this.user.imageName)
    this.img = await this.api.getImgUser(this.user.imageName);
  if( !this.user.gender){
    this.gender = 'Male'
  } 
  else{
    this.gender = 'Female'
  }
    console.log(this.user)
  }

}
