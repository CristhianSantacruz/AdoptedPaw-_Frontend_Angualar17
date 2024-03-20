import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink, Router, RouterLinkActive} from "@angular/router";
import {TokenService} from "../../../../core/service/token.service";
import {AuthLoginDto} from "../../../../core/dto/AuthDto";
import {lastValueFrom} from "rxjs";
import {AuthenticationService} from "../../../../core/service/authentication.service";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public   loginForm : FormGroup
  private  authLoginToken : string  = ""
  private userName : string  = ""

  constructor(private fb:FormBuilder,private router:Router,private tokenService:TokenService,private authService : AuthenticationService) {
    this.loginForm = this.fb.group({
      emailUser: ['',[Validators.required]],
      passwordUser: ['',[Validators.required]]
    })
  }

  public async signIp() : Promise<void> {
    if(this.loginForm.valid){
      let authLogin : AuthLoginDto = {
        email : this.loginForm.value.emailUser,
        password : this.loginForm.value.passwordUser
      }

      await lastValueFrom(this.authService.signIn(authLogin))
        .then(async  result => {
          this.authLoginToken = result.jwt
         await this.succesLoginGreat()
        })
        .catch(error=>{
            Swal.fire({
              icon : "error",
              title : "Oops...",
              text : "No pudimos validar tu informacion!"
            })
        })

    }else {
      await Swal.fire({
        icon: "error",
        title: "Error..",
        text: " Los datos del formulario no son validos"
      })
    }
  }

  public async succesLoginGreat()  {
    this.userName = this.tokenService.getInfoToken().fullName
    await  Swal.fire({
      position: "center",
      icon:"success",
      title : `Bienvenido ${this.userName}`,
      showConfirmButton : false,
      timer : 2000,

    })
    await this.router.navigateByUrl("/home/main")
  }

    public createAccount(){
      this.router.navigateByUrl('/authentication/register').then()
    }
}
