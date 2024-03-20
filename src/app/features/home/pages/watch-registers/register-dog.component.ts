import {Component, inject, OnInit} from '@angular/core';
import {TokenService} from "../../../../core/service/token.service";
import {UserService} from "../../../../core/service/user.service";
import {PetAnimalDto} from "../../../../core/dto/PetAnimalDto";
import Swal from "sweetalert2";
import {environment} from "../../../../../environments/environment.development";
import {BannerComponent} from "../../components/banner/banner.component";
@Component({
  selector: 'app-register-dog',
  standalone: true,
  imports: [
    BannerComponent
  ],
  templateUrl: './register-dog.component.html',
  styleUrl: './register-dog.component.css'
})
export class AllRegisterDogComponent {

    public userId : string = ""
    public userName : string = ""
    public userEmail : string = ""
    public listRegisterDog : PetAnimalDto[] = []
    public baseUrlImage : string = environment.baseUrl +"/file/"
    constructor(private tokenService : TokenService, private userService : UserService){
      this.userId = tokenService.getInfoToken().userId
      this.userName = tokenService.getInfoToken().fullName
      this.userEmail = tokenService.getInfoToken().email
       this.userService.getAllRegisterDog(this.userId).subscribe(
         {next : value => {
               this.listRegisterDog  = value

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
