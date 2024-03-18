import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {PetAnimalDto} from "../../../../core/dto/PetAnimalDto";
import {PetService} from "../../../../core/service/pet-service.service";
import Swal from "sweetalert2";
import {environment} from "../../../../../environments/environment.development";
import {TokenService} from "../../../../core/service/token.service";
import {AdoptionService} from "../../../../core/service/adoption.service";
import {AdoptionDto} from "../../../../core/dto/Adoption";
import {lastValueFrom} from "rxjs";


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  public  baseUrl : string = environment.baseUrl
  public baseUrlImage : string = this.baseUrl +"/file/"
  public listPets : Array<PetAnimalDto>;

  private userId : string;

    constructor(private petService : PetService,private tokenService : TokenService, private adoptionService : AdoptionService) {
      this.listPets =  []
      this.userId = this.tokenService.getInfoToken().userId
      this.petService.getAllPets().subscribe({
         next : value => {
           this.listPets = value
           console.log(this.listPets);
         },error : err =>{
           Swal.fire({
             icon: "error",
             title: "Error",
             text: "Tuvimos un error al cargar los datos",
             showConfirmButton: false,
             timer: 1000
           })
         }
       })
    }

  protected readonly Component = Component;

  public adoptionByUser(petId : string) {
      let adoptionSaveDto : AdoptionDto = {
        adoptedByUserId : this.userId,
        petId : petId
      }
    Swal.fire({
      icon : "info",
      title : "Se ha realizado un proceso de adopcion",
      showConfirmButton : false,
      timer : 2000
    }).then( value => {
      this.adoptionService.saveAdoptionByUser(adoptionSaveDto).subscribe({
        next : value => {
          Swal.fire({
            icon : "success",
            title : `Hola soy ${value.petAdopte.name}, Gracias 🐕🐕`,
            showConfirmButton : true,
            text : "Nos estaremos comunicando por correo para mas informacion"

          })
        }
      })
    })


  }
}
