import { Component, OnInit, ViewChild } from '@angular/core';
declare const google;
@Component({
  selector: 'gogle-map',
  templateUrl: './gogle-map.component.html',
  styleUrls: ['./gogle-map.component.scss'],
})
export class GogleMapComponent implements OnInit {
  @ViewChild("map" , {static : true}) mapElement;
  map: any;
  constructor() {
    
  }

  ngOnInit(){
     this.initMap();
  }

  initMap(){

    let coords = new google.maps.LatLng(25,80);
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
