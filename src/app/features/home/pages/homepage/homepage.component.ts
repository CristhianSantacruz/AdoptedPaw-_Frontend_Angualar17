import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {PetAnimalDto} from "../../../../core/dto/PetAnimalDto";
import {PetService} from "../../../../core/service/pet-service.service";
import Swal from "sweetalert2";
import {environment} from "../../../../../environments/environment.development";


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

    constructor(private petService : PetService) {
      this.listPets =  []
      this.petService.getAllPets().subscribe({
         next : value => {
           this.listPets = value
           console.log(this.listPets);
         },error : err =>{
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

  protected readonly Component = Component;
}
