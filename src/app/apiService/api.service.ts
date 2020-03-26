import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  async getUpdateStatus() {
    
        let data = (<any>await this.httpClient.post('http://waleedser-001-site1.atempurl.com/api/users/updatestate',
        {
          "userId": 1 ,
	"latitude": 30.29, //Double
	"longitude": 30.011, //Double
	"colorId": 1
        }
      
      ).toPromise()).data;
    
        return data.map(ele => {
          console.log(ele)
          return {
           ele
          }
        });
      }
      async getPolylines() {
       
            let data = (<any>await this.httpClient.get(' http://waleedser-001-site1.atempurl.com/api/polylines/get').toPromise());
            return data.map(ele => {
              // console.log(ele)
              return {
               ele
              }
            });
          
        }
        async getUser() {
         
              let data = (<any>await this.httpClient.get('http://waleedser-001-site1.atempurl.com/api/users/get').toPromise());
              return data.map(ele => {
                // console.log(ele)
                return {
                 ele
                }
              });
            
            
  
            
          }
}
