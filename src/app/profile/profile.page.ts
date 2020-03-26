import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/apiService/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getPolylines();
  }

}
