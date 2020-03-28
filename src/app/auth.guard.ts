import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storage : Storage , private router : Router){

  }
 async  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      let user = await  this.storage.get('user');

      if(!user){
        this.router.navigate(['login'])
      }
      return user;
    }
  
}
