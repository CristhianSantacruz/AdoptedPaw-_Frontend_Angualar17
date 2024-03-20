import { Component } from '@angular/core';
import {AdoptionResponseDto} from "../../../../core/dto/Adoption";
import {TokenService} from "../../../../core/service/token.service";
import {AdoptionService} from "../../../../core/service/adoption.service";
import Swal from "sweetalert2";
import {BannerComponent} from "../../components/banner/banner.component";
import {environment} from "../../../../../environments/environment.development";

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [
    BannerComponent
  ],
  templateUrl: './adoption.component.html',
  styleUrl: './adoption.component.css'
})
export class AdoptionComponent {
  public userName : string = ""
  public baseUrlImage : string = environment.baseUrl +"/file/"
  public listAdoptionPets : AdoptionResponseDto[] = []
  constructor(private tokenService : TokenService,private adoptionService: AdoptionService) {
    this.userName = this.tokenService.getInfoToken().fullName
     this.adoptionService.getAllAdoptionByUser(tokenService.getInfoToken().userId)
       .subscribe({
         next : value => {
            this.listAdoptionPets = value
         },error : err => {
           Swal.fire({
             icon: "error",
             title : "Error",
             text : "Tuvimos un error al cargar los datos",
             showConfirmButton : false,
             timer:1000
           })
         }
       })
  }
}
