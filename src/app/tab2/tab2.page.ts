import { Component, NgModule } from '@angular/core';
import { GogleMapComponent } from "src/app/gogle-map/gogle-map.component";
import { ModalController } from "@ionic/angular";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
@NgModule({
  imports:      [  ],
  declarations: [ GogleMapComponent],
  exports:      [
                  ]
 })
export class Tab2Page {

 

  constructor(   public modalController: ModalController,) {}
  async presentModal(type:string) {
   
    const modal = await this.modalController
    
   
    return await modal
  }
  }

