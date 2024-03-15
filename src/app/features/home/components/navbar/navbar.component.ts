import {Component, inject} from '@angular/core';
import {TokenService} from "../../../../core/service/token.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  tokenService = inject(TokenService)
  route = inject(Router)
  public async logout(){
    this.tokenService.deleteToken()
   await  Swal.fire({
      icon :"success",
      title :"Nos vemos",
      showConfirmButton : false,
       timer : 1500
    })
    this.route.navigateByUrl("/authentication/login").then()

  }
}
