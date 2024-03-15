import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";

export const authGuardWithAuth: CanActivateFn = (route, state) => {
  let tokenService = inject(TokenService)
  let router = inject(Router)
   if(tokenService.getToken()){
     router.navigateByUrl("/home/main").then()
     return false
   }else {
     return true
   }

};

export const authGuardWithoutAuth : CanActivateFn = (route, state) => {
  let tokenService = inject(TokenService)
  let router = inject(Router)
  if(!tokenService.getToken()){
    console.log("No puedes estar aqui")
    router.navigateByUrl("/authentication/login").then()
    return false
  }else {
    return true
  }

};

