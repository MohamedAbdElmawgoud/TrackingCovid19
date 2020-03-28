import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  async getUpdateStatus(data) {

    return (<any>await this.httpClient.post('http://waleedser-001-site1.atempurl.com/api/users/updatestate',
      // {
      //   "userId": 1,
      //   "latitude": 30.29, //Double
      //   "longitude": 30.011, //Double
      //   "colorId": 1
      // }
    data
    ).toPromise());

  }
  async getPolylines() {

    let data = (<any>await this.httpClient.get('http://waleedser-001-site1.atempurl.com/api/polylines').toPromise());
    return data.map(ele => {
      // console.log(ele)
      return {
        ele
      }
    });

  }
  async getUser(id) {

    return (<any>await this.httpClient.get('http://waleedser-001-site1.atempurl.com/api/users/' + id).toPromise());

  }
  async appInfo(id) {

    return (<any>await this.httpClient.get('http://waleedser-001-site1.atempurl.com/api/appinfo').toPromise());

  }
  async posts(id) {

    return (<any>await this.httpClient.get('http://waleedser-001-site1.atempurl.com/api/posts').toPromise());

  }
  async getUsers(){
  return (<any>await this.httpClient.get('http://waleedser-001-site1.atempurl.com/api/users').toPromise());

  }
  async getImgUser(name){
    return (<any>await this.httpClient.get(`http://waleedser-001-site1.atempurl.com/images/users/`+name).toPromise());
    
  }

  async getImgPost(name){
    return (<any>await this.httpClient.get(`http://waleedser-001-site1.atempurl.com/images/posts/`+name).toPromise());
    
  }

  async register(data){
     return (<any>await this.httpClient.post('http://waleedser-001-site1.atempurl.com/api/users/register' , data).toPromise());
  }
  async login(data){
   return (<any>await this.httpClient.post('http://waleedser-001-site1.atempurl.com/api/users/login' , data).toPromise());
 }
 async contactUs(data){
  return(<any>await this.httpClient.post('http://waleedser-001-site1.atempurl.com/api/contactus' , data).toPromise());
}
async contact(){
 return (<any>await this.httpClient.get('http://waleedser-001-site1.atempurl.com/api/contactus').toPromise());
}
}
