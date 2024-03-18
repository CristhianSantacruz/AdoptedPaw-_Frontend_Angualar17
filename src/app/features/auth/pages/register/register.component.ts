import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../core/service/authentication.service";
import Swal from "sweetalert2";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserSaveDto} from "../../../../core/dto/UserDto";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    public nameUserRegister : string =  ""

    public userRegisterForm : FormGroup;

    constructor(private fb:FormBuilder,private authService : AuthenticationService,private router:Router) {
      this.userRegisterForm = this.fb.group({
        userDni : ['',Validators.required],
        userName : ['',Validators.required],
        userEmail : ['',Validators.required],
        userPhone : ['',Validators.required],
        userPassword : ['',Validators.required],
        userConfirmPassword : ['',Validators.required],
      })
    }

    public registerUser(){
        if(!this.userRegisterForm.valid){
          Swal.fire({
            icon:"error",
            text : "Los datos no son validos",
            title : "Opps",
          })
          return
        }
        if(this.userRegisterForm.controls['userPassword'].value != this.userRegisterForm.controls['userConfirmPassword'].value){
            Swal.fire({
              icon :'warning',
              title : 'Error',
              text : 'Las contrasenas no son iguales',
              showConfirmButton : true
          })
          return
        }
        let userData : UserSaveDto = {
          dni : this.userRegisterForm.controls['userDni'].value,
          fullName : this.userRegisterForm.controls['userName'].value,
          email : this.userRegisterForm.controls['userEmail'].value,
          phone : this.userRegisterForm.controls['userPhone'].value,
          password : this.userRegisterForm.controls['userPassword'].value
        }
        this.authService.register(userData).subscribe({
          next : async value => {
            await  Swal.fire({
               icon: "success",
               title : "Perfecto",
               text : `Tu cuenta fue creada con exito ${value.fullName}`,
               showConfirmButton: false,
               timer : 2500
             })
            this.userRegisterForm.reset()
          },error : err => {
            Swal.fire({
              icon :'error',
              title : 'Error',
              text : 'Hubo un problema al intentar registrar los datos',
              showConfirmButton : false,
              timer : 1500
            })
          }
        })

    }

    public signIn(){
      this.router.navigateByUrl("/authentication/login")
    }
}
