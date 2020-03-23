import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare const google;
@Component({
  selector: 'gogle-map',
  templateUrl: './gogle-map.component.html',
  styleUrls: ['./gogle-map.component.scss'],
})
export class GogleMapComponent implements OnInit {
  @ViewChild("map" , {static : true}) mapElement;
  map: any;
  lat:number;
  lng:number;

  constructor(
    private geo: Geolocation
  ) { }
 getMyLocation() {
  this.geo.getCurrentPosition({
    enableHighAccuracy: true
  }).then(location => {
    this.lat = location.coords.latitude;
    this.lng = location.coords.longitude;
    this.initMap(this.lat,this.lng);
  })
   setInterval(()=>{
    this.geo.getCurrentPosition({
      enableHighAccuracy: true
    }).then(location => {
      this.lat = location.coords.latitude;
      this.lng = location.coords.longitude;
      this.initMap(this.lat,this.lng);
    })},
    10000
  )
   
    
  }

  ngOnInit(){
    
    this.getMyLocation();
  }

  initMap(lat,lng){
    
  
    let coords = new google.maps.LatLng(lat,lng);
    let mapOptions= {
      center: coords,
      zoom: 11,
      mapTypeId: (<any>google).maps.MapTypeId.ROADMAP
    }
    
    this.map = new (<any>google).maps.Map(this.mapElement.nativeElement, mapOptions)

    let marker = new (<any>google).maps.Marker({
      map: this.map,
      position: coords
    })

  }


}
