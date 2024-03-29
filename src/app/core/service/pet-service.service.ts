import { Injectable } from '@angular/core';
import {Token} from "@angular/compiler";
import {TokenService} from "./token.service";
import {HttpClient} from "@angular/common/http";
import {PetAnimalDto, PetDto, PetSaveResponseDto} from "../dto/PetAnimalDto";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private baseUrl : string = environment.baseUrl
  constructor(private tokenService : TokenService , private httpClient : HttpClient) {}

  public getAllPets() : Observable<PetAnimalDto[]> {
    return this.httpClient.get<PetAnimalDto[]>(`${this.baseUrl}/pet`)
  }
  public savePet(petSaveDto : PetDto) : Observable<PetSaveResponseDto> {
    return this.httpClient.post<PetSaveResponseDto>(`${this.baseUrl}/pet`,petSaveDto)
  }

  public getPetById(idPet : string)  {
    return this.httpClient.get<PetDto>(`${this.baseUrl}/pet/${idPet}`)
  }

}
