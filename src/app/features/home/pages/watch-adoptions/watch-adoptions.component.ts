import {Component} from '@angular/core';
import {AdoptionDto, AdoptionResponseAdminDto} from "../../../../core/dto/Adoption";
import {AdoptionService} from "../../../../core/service/adoption.service";
import Swal from "sweetalert2";
import {PetService} from "../../../../core/service/pet-service.service";
import {PetDto} from "../../../../core/dto/PetAnimalDto";
import {lastValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment.development";

@Component({
  selector: 'app-watch-adoptions',
  standalone: true,
  imports: [],
  templateUrl: './watch-adoptions.component.html',
  styleUrl: './watch-adoptions.component.css'
})
export class WatchAdoptionsComponent {
  public listAdoptions : Array<AdoptionResponseAdminDto> = []
  public baseUrlImage  = environment.baseUrl+ '/file/'
  constructor(private adoptionService : AdoptionService,private petService : PetService) {
    this.adoptionService.getAllAdoptions().subscribe({
      next : value => {
        this.listAdoptions = value

      },error : err => {
        Swal.fire({
          icon : "error",
          title : "Error",
          text : "Hubo un error en crear las donaciones",
          showConfirmButton : false,
          timer : 1500
        })
      }
    })
  }


}

