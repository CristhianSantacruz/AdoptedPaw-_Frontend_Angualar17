import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl =  environment.baseUrl + "/file"
  constructor(private httpClient : HttpClient ) {}

   public saveImagePet(idPet: string | undefined, formData: FormData){
    return this.httpClient.post(`${this.baseUrl}/upload/${idPet}`,formData);
   }
}
