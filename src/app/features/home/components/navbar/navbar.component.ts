import {Component, inject} from '@angular/core';
import {TokenService} from "../../../../core/service/token.service";
import Swal from "sweetalert2";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  menuVisibleResponsive: boolean = false;
  nameUser : string  = ""

  toggleMenu(){
    this.menuVisibleResponsive = !this.menuVisibleResponsive
  }
  tokenService = inject(TokenService)
  constructor() {
    this.nameUser = this.tokenService.getInfoToken().fullName
  }

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
