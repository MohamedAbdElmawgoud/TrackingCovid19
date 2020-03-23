import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GogleMapComponent } from './gogle-map.component';



@NgModule({
  declarations: [GogleMapComponent],
  exports: [GogleMapComponent],
  imports: [
    CommonModule
  ]
})
export class GoogleMapsModule { }
