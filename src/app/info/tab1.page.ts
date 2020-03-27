import { Component , OnInit } from '@angular/core';
import { ApiService } from "src/app/apiService/api.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  posts: any;


  async ngOnInit() {
    this.posts=await this.api.posts(2)
    console.log(this.posts)
  }


screen=true;
  constructor(private api: ApiService,) {}
  changeScreen(status:number){
 if(status == 0){
   this.screen= false;
  
 }else{
   this.screen=true;
 }
 
 return this.screen
  }
}
