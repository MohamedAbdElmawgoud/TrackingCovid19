import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
screen=true;
  constructor() {}
  changeScreen(status:number){
 if(status == 0){
   this.screen= false;
  
 }else{
   this.screen=true;
 }
 
 return this.screen
  }
}
