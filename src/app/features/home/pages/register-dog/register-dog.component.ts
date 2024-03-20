import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PetService} from "../../../../core/service/pet-service.service";
import { PetDto, petSaveDtoToString} from "../../../../core/dto/PetAnimalDto";
import {TokenService} from "../../../../core/service/token.service";
import Swal from "sweetalert2";
import {FileService} from "../../../../core/service/file.service";
import {Router} from "@angular/router";

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
  constructor(private fb:FormBuilder,private petService : PetService,private tokenService : TokenService,private fileService:FileService, private route:Router) {
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

  public async registerPet() {
    if(this.registerForm.valid){
      let petDto : PetDto= {
        userId : this.tokenService.getInfoToken().userId,
        name : this.registerForm.value.namePet,
        age : this.registerForm.value.agePet,
        size : this.registerForm.value.sizePet,
        raze : this.registerForm.value.razePet,
        petType : this.registerForm.value.petTypePet,
        description : this.registerForm.value.descriptionPet,
        contactPet : this.registerForm.value.contactPet,
      }

       this.petService.savePet(petDto).subscribe({
        next : async value => {
          this.idDogRegister = value.id

          await Swal.fire({
            title: "Sucess",
            icon : "success",
            text : "Se ha registrado correctamente el primer Paso",
            showConfirmButton : false,
            timer : 1000,
          })
          this.showUploadImage = true
          await this.route.navigateByUrl("/home/register-dog")
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
      await Swal.fire({
        title: "Opps ",
        text: "Hay un error en el formulario",
        icon: "info",
        showConfirmButton: false,
        timer: 1000,
      })
    }
  }
  public async registerImageForPet(event: any){
    const file : File = event.target.files[0]
    if(file){
      const formData:FormData = new FormData();
      formData.append('file',file)
      this.fileService.saveImagePet(this.idDogRegister, formData).subscribe({
        error : async err => {
          await Swal.fire({
            icon: "success",
            title: "Se ha subido correctamente",
            showConfirmButton: false,
            timer: 2000,
          })
          this.showUploadImage = false
          this.registerForm.reset()
        }})
    }else {
      await Swal.fire({
        icon: "info",
        title: "Vacio",
        text: "No has proporcionado ningun archivo recuerda solo imagenes",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }

}
