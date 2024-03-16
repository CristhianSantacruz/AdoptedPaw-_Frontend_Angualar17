import { Injectable } from '@angular/core';
import {TokenService} from "./token.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {PetAnimalDto} from "../dto/PetAnimalDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl : string = environment.baseUrl + "/user"
  constructor(private tokenService : TokenService,private httpClient : HttpClient) {}

  public getAllRegisterDog(dni:string) :  Observable<PetAnimalDto[]> {
    return this.httpClient.get<PetAnimalDto[]>(`${this.baseUrl}/pets/${dni}`);
  }
}
