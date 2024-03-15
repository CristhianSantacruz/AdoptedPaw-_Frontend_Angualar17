import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { HomepageComponent } from './features/home/pages/homepage/homepage.component';
import { RegisterDogComponent } from './features/home/pages/register-dog/register-dog.component';

export const routes: Routes = [
  {
    path: 'authentication',
    component: FeaturesComponent,
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
    children: [
      {
        path: 'main',
        title: 'Home Page',
        component: HomepageComponent,
      },
      {
        path: 'registerdog',
        title: 'Register Dog',
        component: RegisterDogComponent,
      },
    ],
  },
];
