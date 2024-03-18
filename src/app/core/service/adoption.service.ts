import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {AdoptionDto, AdoptionResponseDto} from "../dto/Adoption";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  private baseUrl : string = environment.baseUrl + "/adopt"
  constructor(private httpClient : HttpClient) {}

  public getAllAdoptionByUser(dni : string) {
    return this.httpClient.get<AdoptionResponseDto[]>(`${this.baseUrl}/${dni}`);
  }
  public saveAdoptionByUser(adoptionDto : AdoptionDto): Observable<AdoptionResponseDto>{
    return this.httpClient.post<AdoptionResponseDto>(`${this.baseUrl}`,adoptionDto)
  }
}
