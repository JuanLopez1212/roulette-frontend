import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private tokenKey = 'x-token'
  private roleKey = 'user-role'

  constructor( private http: HttpClient ) {}

  register( body: { username: string; email: string; password: string; role: string; totalDeposited?: { amount: number }[] }) {
    return this.http.post( `${environment.apiUrl}/auth/register`, body )
  }

  login( body: { email: string; password: string }) {
    return this.http.post<{ token: string; role: 'player'|'admin'}>(
      `${environment.apiUrl}/auth/login`, body
    ).pipe(
      tap(({token, role }) => {
        localStorage.setItem( this.tokenKey, token )
        localStorage.setItem( this.roleKey, role )
      })
    )
  }

  logout() {
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.roleKey)
  }

  isLoggedIn() { return !!localStorage.getItem( this.tokenKey ) }
  getToken() { return localStorage.getItem( this.tokenKey ) }
  getUserRole() { return localStorage.getItem( this.roleKey ) }
}
