import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

interface User {
    email: string;
    password: string;
}

interface AuthResponse {
  expiresIn: string;
  idToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  login(user: User) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(response => this.setToken(response))
    );
  }

  private setToken (response: AuthResponse | null) {
    if (isPlatformBrowser(this.platformId)) {
      if (response) {
        const expData = new Date(new Date().getTime() + +response.expiresIn * 1000)
        localStorage.setItem("fb-token-exp", expData.toString())
        localStorage.setItem("fb-token", response.idToken)
      } else {
        localStorage.clear()
      }
    }
  }

  get token () {
    if (isPlatformBrowser(this.platformId)) {
      const expDataString = localStorage.getItem("fb-token-exp");

      if (!expDataString) {
        this.logout();
        return null;
      }

      const expData = new Date(expDataString);

      if (new Date() > expData) {
        this.logout()
        return null
      }
      return localStorage.getItem("fb-token");
      }

      return null;
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }
}
