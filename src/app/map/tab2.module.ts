import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { GogleMapComponent } from '../gogle-map/gogle-map.component';
import { GoogleMapsModule } from '../gogle-map/google-maps.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  
  declarations: [Tab2Page ]
})
export class Tab2PageModule {}
