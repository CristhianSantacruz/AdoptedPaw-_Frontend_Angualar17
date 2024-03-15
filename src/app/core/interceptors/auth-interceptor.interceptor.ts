import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";
import {catchError} from "rxjs";
import Swal from "sweetalert2";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let tokenService : TokenService = inject(TokenService)
  let token = tokenService.getToken()
  if(!token){
    return next(req)
  }
  let authRequest = req.clone({
    setHeaders : {
      'Authorization' : `Bearer ${token}`,
      'Access-Control-Allow-Origin' : '*'
    }
  })
  return next(authRequest).pipe(
    catchError((err)=>{
      if(err.status===403){
        Swal.fire(
          {
            icon: 'error',
            title: 'Oppss...',
            text : 'No tienes permisos para acceder a esta pagina'
          }
        )
      }
      throw err;
    })
  );
};
