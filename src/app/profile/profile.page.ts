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
    this.test=await this.api.contact()
    console.log(this.test)
  }

}
