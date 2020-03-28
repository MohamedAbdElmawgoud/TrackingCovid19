import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController, Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
import { ApiService } from "src/app/apiService/api.service";

declare const google;
const Red = {
  url: 'assets/icon/markerRed.svg', // image url
  // Size: new google.maps.Size(10, 10), // scaled size
  size: {
    width: 20,
    height: 20
 }
};

const Orange = {
  url: 'assets/icon/markerOrange.svg', // image url
  // Size: new google.maps.Size(10, 10), // scaled size
  size: {
    width: 20,
    height: 20
 }
};

const Yellow = {
  url: 'assets/icon/markerYellow.svg', // image url
  // Size: new google.maps.Size(10, 10), // scaled size
  size: {
    width: 20,
    height: 20
 }
};

const Black = {
  url: 'assets/icon/markerBlack.svg', // image url
  // Size: new google.maps.Size(10, 10), // scaled size
  size: {
    width: 20,
    height: 20
 }
};

const Green = {
  url: 'assets/icon/markerGreen.svg', // image url
  // Size: new google.maps.Size(10, 10), // scaled size
  size: {
    width: 20,
    height: 20
 }
};

@Component({
  selector: 'gogle-map',
  templateUrl: './gogle-map.component.html',
  styleUrls: ['./gogle-map.component.scss'],
})
export class GogleMapComponent implements OnInit {
  colorName=[];
  routePointss = [];
  poly = [];
  lat= [];
  lng=[];
  color=[];
  route: any;

  routePoints= [];
  map: GoogleMap;
  address:string;
 
  constructor(
    public toastCtrl: ToastController,
    private api: ApiService,
    private platform: Platform
    ) { }
 
  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    
    this.platform.ready();
    this.route =  await this.api.getPolylines();
  // console.log(this.route);
   this.route.forEach(element => {
    this.poly.push(element);
   
  });
 this.poly.forEach(element => {
  this.lat.push(element.ele.latitude);
  this.lng.push(element.ele.longitude);
  this.colorName.push(element.ele.color.colorName);
  this.color.push(element.ele.color.colorHex);
 });


    this.loadMap();
    this.routeP();
  
    
  }
 
    
       
  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
    
    });
    
    this.goToMyLocation();
    setInterval(()=>{ 
      
      this.map = GoogleMaps.create('map_canvas', {
      
      });
      
      this.goToMyLocation();
    },
    10000
    )
  }
 
  routeP(){
    for (let i = 0; i < this.lat.length && this.lng.length; i++) {
      console.log(this.color[i]);
      
     this.routePointss= [  {
        lat: this.lat[i],
        lng: this.lng[i]
      },
      {
        lat: this.lat[i]+(0.00000900900900900901*10),
        lng: this.lng[i]
      },
      
      
    ];
    this.addPlolyLine(this.routePointss ,this.color[i] , this.colorName[i]);
    this.routePointss= [  {
      lat: this.lat[i],
      lng: this.lng[i]
    },
    {
      lat: this.lat[i],
      lng: this.lng[i]+(0.00000900900900900901*10)
    },
    
    
  ];
  this.addPlolyLine(this.routePointss ,this.color[i] , this.colorName[i]);


  this.routePointss= [  {
    lat: this.lat[i],
    lng: this.lng[i]
  },
  {
    lat: this.lat[i]-(0.00000900900900900901*10),
    lng: this.lng[i]
  },
  
  
];
this.addPlolyLine(this.routePointss ,this.color[i] , this.colorName[i]);


this.routePointss= [  {
  lat: this.lat[i],
  lng: this.lng[i]
},
{
  lat: this.lat[i],
  lng: this.lng[i]-(0.00000900900900900901*10)
},


];
this.addPlolyLine(this.routePointss ,this.color[i] , this.colorName[i]);
    }
    
    console.log('this is route ', this.routePointss);
 }
  goToMyLocation(){
    this.map.clear();
 
    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      console.log(JSON.stringify(location, null ,2));
      let lat = location.latLng.lat;
      let lng = location.latLng.lng;
    
     
      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        duration: 5000,
        
      });
 
      //add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: '@ionic-native/google-maps plugin!',
        snippet: 'This plugin is awesome!',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE,
        icon : Black,
      });
 
      //show the infoWindow
      marker.showInfoWindow();
 
      //If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });
 
      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
        (data) => {
            console.log("Click MAP",data);
        }
      );
    })
    .catch(err => {
      //this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }
  addPlolyLine(routePoints ,color ,colorName){      
    this.map.addPolyline({
            points: routePoints,
            'color': color,
            'width': 4,
            'geodesic': true
          }).then((resp) => {
            let restaurantMarkerOptions: MarkerOptions = {
              title: "Sample Title",
              position: routePoints[routePoints.length - 1],
              animation: GoogleMapsAnimation.BOUNCE,
              icon: colorName
            };
            this.map.addMarker(restaurantMarkerOptions).then((marker: Marker) => {
              marker.showInfoWindow();
          });
            });
        }
  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
  
//  getMyLocation() {
//   this.geo.getCurrentPosition({
    
//     enableHighAccuracy: true
    
    
//   }).then(location => {
   
//     this.lat = location.coords.latitude;
//     this.lng = location.coords.longitude;
   
//     this.destination = [
//       {lat: this.lat, lng: this.lng},
     
      
//     ];
//     this.initMap(this.lat,this.lng);
//     this.cretePolyLine(this.destination ,'#FF0000');
    
//   })
//    setInterval(()=>{
//     this.geo.getCurrentPosition({
//       enableHighAccuracy: true
//     }).then(location => {
      
//       this.lat = location.coords.latitude;
//       this.lng = location.coords.longitude;
//     let point= this.addPoint(this.lat,this.lng);
//     let points = this.addPoint( point.lato,point.lono);
//     let pointss = this.addPoint( points.lato,points.lono);    
//     let test = [];
//       test.push(point,points,pointss);

//       this.initMap(this.lat,this.lng,);
//         this.destination = [
//           {lat: this.lat, lng: this.lng},
//           {lat: test[0].lato, lng: test[0].lono},
//           {lat: test[1].lato, lng: test[1].lono},
         
//         ];
      
//       this.cretePolyLine(this.destination,'#FF0000');
//       this.destination=[
//         {lat: test[2].lato, lng: test[2].lono},
//         {lat: test[2].lato+(0.000009000009*10), lng: test[2].lono+(0.000009000009*10)},
//       ]
//       this.cretePolyLine(this.destination,'#00FFA3');
//       this.destination = [
       
//         {lat: test[2].lato+(0.000009000009*50), lng: test[0].lono+(0.000009000009*50)},
//         {lat: test[1].lato+(0.000009000009*50), lng: test[1].lono+(0.000009000009*50)},
       
//       ];
//       this.cretePolyLine(this.destination,'#FFB200');

//       this.destination=[
//         {lat: test[1].lato, lng: test[2].lono},
//         {lat: test[2].lato+(0.000009000009*80), lng: test[2].lono+(0.000009000009*80)},
//       ]
//       this.cretePolyLine(this.destination,'#00BCFF');
//       this.destination = [
       
//         {lat: test[2].lato+(0.000009000009*200), lng: test[2].lono+(0.000009000009*100)},
//         {lat: test[1].lato+(0.000009000009*10), lng: test[1].lono+(0.000009000009*10)},
       
//       ];
//       this.cretePolyLine(this.destination,'#194B11');
//       // this.presentToast(this.lat)
      
     
//     })},
//     10000
//   )
   
    
//   }


//   addPoint(lat,lng){
   
//     let R=6378137
    
//     //  //offsets in meters
//     //  let dn = 10 
//     //  let de = 10
    
//     //  //Coordinate offsets in radians
//     //  let dLat = dn / R ;
//     //  let dLon = de / (R * Math.acos(3.14 * dLat / 180));
   
//      //OffsetPosition, decimal degrees
// // ==(0.000009000009*10)

//      let latO = lat +(0.000009000009*10);
//      let lonO = lng +(0.000009000009*10) ;
//      return {lato: latO ,lono: lonO}
//   }

//   initMap(lat,lng,){
    
   
//     let coords = new google.maps.LatLng(lat,lng);
//     let mapOptions= {
//       center: coords,
//       zoom: 18,
//       mapTypeId: (<any>google).maps.MapTypeId.ROADMAP
//     }
    
//     this.map = new (<any>google).maps.Map(this.mapElement.nativeElement, mapOptions)

//     let marker = new (<any>google).maps.Marker({
//       map: this.map,
//       position: coords,
//       icon: icon, 
//       title: 'goda!',
      
//       // animation: window['google'].maps.Animation.DROP,
      
//     })
//     var infoWindow = new google.maps.InfoWindow({
//       content: 'Goda address'
//     });

//     google.maps.event.addListener(marker, 'click', function () {
//       infoWindow.open(this.map, marker);
//     });
    
   
 

  

  
//   }
//   cretePolyLine(destination ,color){
//     this.polylineOptions = new google.maps.Polyline({
//       path: destination,
//       geodesic: true,
//       strokeColor: color,
//       strokeOpacity: 1.0,
//       strokeWeight: 3
//     });
//     this.polylineOptions.setMap(this.map);
//   }


}
