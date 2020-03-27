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
status;
  constructor(private api: ApiService,) { }

  async ngOnInit() {
    this.user=await this.api.getUser(3);
    
    this.status = await this.api.getUpdateStatus(
      {
      userId: 1,
      latitude: 30.1, //Double
      longitude: 31.0, //Double
      colorId: 2
    }
    );
    console.log('status is ', this.status)
    // this.img = await this.api.getImgUser(this.user.imageName);
  if( !this.user.gender){
    this.gender = 'Male'
  } 
  else{
    this.gender = 'Female'
  }
    
  }

}
