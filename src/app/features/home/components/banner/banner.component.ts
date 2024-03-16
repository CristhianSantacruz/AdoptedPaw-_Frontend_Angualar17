import {Component, input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Input} from "postcss";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

}
