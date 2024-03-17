import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { HomepageComponent } from './features/home/pages/homepage/homepage.component';

import {authGuardWithAuth, authGuardWithoutAuth} from "./core/guards/auth-guard.guard";
import {AdoptionComponent} from "./features/home/pages/adoption/adoption.component";
import {RegisterDogComponent} from "./features/home/pages/register-dog/register-dog.component";
import {AllRegisterDogComponent} from "./features/home/pages/watch-registers/register-dog.component";


export const routes: Routes = [
  {path:'',redirectTo:"/authentication/login",pathMatch:"full"},
  {
    path: 'authentication',
    component: FeaturesComponent,
    canActivate: [authGuardWithAuth],
    children: [
      {
        path: 'login',
        title: 'Login Page',
        component: LoginComponent,
      },
      {
        path: 'register',
        title: 'Register Page',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate : [authGuardWithoutAuth],
    children: [
      {
        path: 'main',
        title: 'Home Page',
        component: HomepageComponent,
      },
      {
        path: 'registers',
        title: 'All registers',
        component: AllRegisterDogComponent,
      },
      {
        path : 'adoption',
        title :"Adoptions Paw",
        component:AdoptionComponent
      },
      {
        path:  'register-dog',
        title : "Register Dog",
        component: RegisterDogComponent
      }
    ],
  },
];
