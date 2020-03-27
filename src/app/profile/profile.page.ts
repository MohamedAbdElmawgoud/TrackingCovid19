import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/apiService/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
test;
  constructor(private api: ApiService,) { }

  async ngOnInit() {
    this.test=await this.api.getUpdateStatus( {
        "userId": 1,
        "latitude": 30.29, //Double
        "longitude": 30.011, //Double
        "colorId": 1
      });
    console.log(this.test)
  }

}
