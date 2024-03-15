import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {provideClientHydration} from "@angular/platform-browser";
import {authInterceptor} from "./core/interceptors/auth-interceptor.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
    FormsModule,
    HttpClient,
    HttpClientModule,
    provideClientHydration()

  ]
};
