import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare const google;
const icon = {
  url: 'https://cdn3.iconfinder.com/data/icons/real-estate-20/512/1-33-512.png', // image url
  scaledSize: new google.maps.Size(50, 50), // scaled size
};

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
  polylineOptions: {
    path: '30.5,31.25',
    strokeColor: "red"
  }
  destination =[];
  suppressMarkers: true;
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
    10000000
  )
   
    
  }

  ngOnInit(){
    
    this.getMyLocation();
  }

  initMap(lat,lng){
    
   
    let coords = new google.maps.LatLng(lat,lng);
    let Polyline = new google.maps.Polyline(this.polylineOptions);
    console.log(Polyline);
    let mapOptions= {
      center: coords,
      zoom: 3,
      mapTypeId: (<any>google).maps.MapTypeId.ROADMAP
    }
    
    this.map = new (<any>google).maps.Map(this.mapElement.nativeElement, mapOptions)

    let marker = new (<any>google).maps.Marker({
      map: this.map,
      position: coords,
      icon: icon, 
      title: 'goda!',
      
      animation: window['google'].maps.Animation.DROP,
      
    })
    var infoWindow = new google.maps.InfoWindow({
      content: 'Goda address'
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(this.map, marker);
    });
    Polyline.setMap(this.map);
  }


}
