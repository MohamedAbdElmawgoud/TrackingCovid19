import { Component, NgModule } from '@angular/core';
import { GogleMapComponent } from "src/app/gogle-map/gogle-map.component";
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  lat;
  lng;

  constructor(
    private geo: Geolocation
  ) { }

  getMyLocation() {
    this.geo.getCurrentPosition({
      enableHighAccuracy: true
    }).then(location => {
      this.lat = location.coords.latitude;
      this.lng = location.coords.longitude
    })
  }
}