import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PetService} from "../../../../core/service/pet-service.service";
import {PetAnimalDto, PetSaveDto, petSaveDtoToString} from "../../../../core/dto/PetAnimalDto";
import {TokenService} from "../../../../core/service/token.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register-dog',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-dog.component.html',
  styleUrl: './register-dog.component.css'
})
export class RegisterDogComponent {
  showUploadImage: boolean = false;
  public registerForm : FormGroup;
  private idDogRegister : string | undefined;
  constructor(private fb:FormBuilder,private petService : PetService,private tokenService : TokenService) {
      this.registerForm = this.fb.group({
        namePet : [''],
        agePet : [''],
        razePet : [''],
        sizePet: [''],
        petTypePet: [''],
        contactPet : [''],
        descriptionPet : ['',[Validators.required]],
      })

  }

  public async registerCar() {
    if(this.registerForm.valid){
      let petDto : PetSaveDto= {
        userId : this.tokenService.getInfoToken().userId,
        name : this.registerForm.value.namePet,
        age : this.registerForm.value.agePet,
        size : this.registerForm.value.sizePet,
        raze : this.registerForm.value.razePet,
        petType : this.registerForm.value.petTypePet,
        description : this.registerForm.value.descriptionPet,
        contactPet : this.registerForm.value.contactPet,
      }
      console.log("Animal que se va a registrar"+petSaveDtoToString(petDto))
       this.petService.savePet(petDto).subscribe({
        next : async value => {
          this.idDogRegister = value.id
          console.log("La id del perro :"+this.idDogRegister)
          await Swal.fire({
            title: "Sucess",
            icon : "success",
            text : "Se ha registrado correctamente el primer Paso",
            showConfirmButton : false,
            timer : 1000,
          })
          this.showUploadImage = true
        },error : err => {
           Swal.fire({
             title: "Opss",
             icon : "error",
             text : "Ocurrio un error al intentar registrar la mascota",
             showConfirmButton : false,
             timer : 1000,
           })
        }
      })
    }
    else {
      Swal.fire({
        title: "Opps",
        icon : "error",
        showConfirmButton : false,
        timer : 1000,
      })
    }
  }
}
