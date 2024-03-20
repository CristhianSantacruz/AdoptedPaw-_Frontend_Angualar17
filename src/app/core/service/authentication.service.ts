import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {AuthLoginDto, AuthResponseDto} from "../dto/AuthDto";
import {Observable, tap} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {UserDto, UserSaveDto} from "../dto/UserDto";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl : string = environment.baseUrl

  constructor(private httpClient : HttpClient,private tokenService: TokenService) {}

  public signIn(authDto : AuthLoginDto) : Observable<AuthResponseDto>{
    return this.httpClient.post<AuthResponseDto>(this.baseUrl+"/auth/sign-in",authDto).pipe(
      tap( response=> {
        this.tokenService.saveToken(response.jwt)

      })
    )
  }
  public register(registerDto : UserSaveDto) : Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${this.baseUrl}/auth/register`,registerDto)
  }
  public signOut(jwt : string) : Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/auth/sing-out`,jwt)
  }
}
