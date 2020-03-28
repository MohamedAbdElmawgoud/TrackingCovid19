import { Component, OnInit } from '@angular/core';
import { ApiService } from "../apiService/api.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {};
  gender;
  img;
  status;
  constructor(private api: ApiService, private storage: Storage) { }

  async ngOnInit() {
    let user = (await this.storage.get('user'));
    if(user){
      this.user = await this.api.getUser(user.id);


      this.status = await this.api.getUpdateStatus(
        {
          userId: user.id,
          latitude: 30.1, //Double
          longitude: 31.0, //Double
          colorId: this.user ? this.user.color.id : 0
        }
      );
      await this.storage.set('user', this.user)
      console.log('status is ', this.status)
      // this.img = await this.api.getImgUser(this.user.imageName);
      if (this.user && !this.user.gender) {
        this.gender = 'Male'
      }
      else {
        this.gender = 'Female'
      }
  
    }
 
  }

}
