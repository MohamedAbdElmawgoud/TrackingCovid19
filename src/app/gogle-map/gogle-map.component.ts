import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';

declare const google;
const icon = {
  url: 'assets/icon/marker.svg', // image url
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
  polylineOptions;
  destination =[];
  
 
 
  
  suppressMarkers: true;
  constructor(
    private geo: Geolocation
    ,public toastController: ToastController) {}
    
    // async presentToast(title) {
    //   const toast = await this.toastController.create({
    //     message: title,
    //     duration: 3000
    //   });
    //   toast.present();
    // }
 getMyLocation() {
  this.geo.getCurrentPosition({
    
    enableHighAccuracy: true
    
    
  }).then(location => {
   
    this.lat = location.coords.latitude;
    this.lng = location.coords.longitude;
   
    this.destination = [
      {lat: this.lat, lng: this.lng},
     
      
    ];
    this.initMap(this.lat,this.lng);
    this.cretePolyLine(this.destination ,'#FF0000');
    
  })
   setInterval(()=>{
    this.geo.getCurrentPosition({
      enableHighAccuracy: true
    }).then(location => {
      
      this.lat = location.coords.latitude;
      this.lng = location.coords.longitude;
    let point= this.addPoint(this.lat,this.lng);
    let points = this.addPoint( point.lato,point.lono);
    let pointss = this.addPoint( points.lato,points.lono);    
    let test = [];
      test.push(point,points,pointss);

      this.initMap(this.lat,this.lng,);
        this.destination = [
          {lat: this.lat, lng: this.lng},
          {lat: test[0].lato, lng: test[0].lono},
          {lat: test[1].lato, lng: test[1].lono},
         
        ];
      
      this.cretePolyLine(this.destination,'#FF0000');
      this.destination=[
        {lat: test[2].lato, lng: test[2].lono},
        {lat: test[2].lato+(0.000009000009*10), lng: test[2].lono+(0.000009000009*10)},
      ]
      this.cretePolyLine(this.destination,'#00FFA3');
      this.destination = [
       
        {lat: test[2].lato+(0.000009000009*50), lng: test[0].lono+(0.000009000009*50)},
        {lat: test[1].lato+(0.000009000009*50), lng: test[1].lono+(0.000009000009*50)},
       
      ];
      this.cretePolyLine(this.destination,'#FFB200');

      this.destination=[
        {lat: test[1].lato, lng: test[2].lono},
        {lat: test[2].lato+(0.000009000009*80), lng: test[2].lono+(0.000009000009*80)},
      ]
      this.cretePolyLine(this.destination,'#00BCFF');
      this.destination = [
       
        {lat: test[2].lato+(0.000009000009*200), lng: test[2].lono+(0.000009000009*100)},
        {lat: test[1].lato+(0.000009000009*10), lng: test[1].lono+(0.000009000009*10)},
       
      ];
      this.cretePolyLine(this.destination,'#194B11');
      // this.presentToast(this.lat)
      
     
    })},
    10000
  )
   
    
  }

  ngOnInit(){
    
    this.getMyLocation();
  }
  addPoint(lat,lng){
   
    let R=6378137
    
    //  //offsets in meters
    //  let dn = 10 
    //  let de = 10
    
    //  //Coordinate offsets in radians
    //  let dLat = dn / R ;
    //  let dLon = de / (R * Math.acos(3.14 * dLat / 180));
   
     //OffsetPosition, decimal degrees
// ==(0.000009000009*10)

     let latO = lat +(0.000009000009*10);
     let lonO = lng +(0.000009000009*10) ;
     return {lato: latO ,lono: lonO}
  }

  initMap(lat,lng,){
    
   
    let coords = new google.maps.LatLng(lat,lng);
    let mapOptions= {
      center: coords,
      zoom: 18,
      mapTypeId: (<any>google).maps.MapTypeId.ROADMAP
    }
    
    this.map = new (<any>google).maps.Map(this.mapElement.nativeElement, mapOptions)

    let marker = new (<any>google).maps.Marker({
      map: this.map,
      position: coords,
      icon: icon, 
      title: 'goda!',
      
      // animation: window['google'].maps.Animation.DROP,
      
    })
    var infoWindow = new google.maps.InfoWindow({
      content: 'Goda address'
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(this.map, marker);
    });
    
   
 

  

  
  }
  cretePolyLine(destination ,color){
    this.polylineOptions = new google.maps.Polyline({
      path: destination,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    this.polylineOptions.setMap(this.map);
  }


}
