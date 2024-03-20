import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {PetAnimalDto} from "../../../../core/dto/PetAnimalDto";
import {PetService} from "../../../../core/service/pet-service.service";
import Swal from "sweetalert2";
import {environment} from "../../../../../environments/environment.development";
import {TokenService} from "../../../../core/service/token.service";
import {AdoptionService} from "../../../../core/service/adoption.service";
import {lastValueFrom} from "rxjs";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdoptionDtoRequest} from "../../../../core/dto/Adoption";


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  public  baseUrl : string = environment.baseUrl
  public baseUrlImage : string = this.baseUrl +"/file/"
  public listPets : Array<PetAnimalDto>;
  public filteredPets : Array<PetAnimalDto>;
  public isDropdownVisible: boolean = false;
  private userId : string;
  public filterForm : FormGroup

    constructor(private formBuilder : FormBuilder,private petService : PetService,private tokenService : TokenService, private adoptionService : AdoptionService) {
      this.filterForm = this.formBuilder.group({
        filterByPetType : [''],
        filterByPetSize : [''],
      })

      this.listPets =  []
      this.filteredPets = []
      this.userId = this.tokenService.getInfoToken().userId
      this.petService.getAllPets().subscribe({
         next : value => {
           this.listPets = value
           this.filteredPets = [...this.listPets]
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
  //PRRUEBA DE LOS FILTROS

  applyFilters(): void {

    const petType = this.filterForm.controls['filterByPetType'].value
    const petSize = this.filterForm.controls['filterByPetSize'].value
    if(petType){
      this.filteredPets = this.listPets.filter(pet => pet.petType.toLowerCase() === petType.toLowerCase())
    }
    if(petSize){
      this.filteredPets = this.listPets.filter(pet => pet.size.toLowerCase() === petSize.toLowerCase())
    }
    if(petSize.isEmpty && petType.isEmpty){
      this.filteredPets = [...this.listPets]
      return
    }

  }
  resetFilter(): void{
    this.filteredPets = [...this.listPets]
    this.filterForm.reset()
  }

  public adoptionByUser(petId : string) {
      let adoptionSaveDto : AdoptionDtoRequest = {
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
