import { Injectable } from '@angular/core';
import {getCookie, setCookie,removeCookie} from "typescript-cookie";
import {jwtDecode} from "jwt-decode";
import {UserDto} from "../dto/UserDto";

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  public getToken() : string {
    return <string>getCookie("token")
  }
  public saveToken(token : string) : void {
    setCookie("token",token)
  }
  public deleteToken() : void {
    removeCookie("token")
  }
  public getInfoToken(){
    const decode = jwtDecode(this.getToken())

    return <UserDto>decode;
  }
}
