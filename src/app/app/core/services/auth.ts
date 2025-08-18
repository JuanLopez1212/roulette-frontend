// src/app/core/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {
  private tokenKey = 'x-token';
  private roleKey  = 'user-role';

  private userRoleSubject = new BehaviorSubject<'player'|'admin'|null>(
    (localStorage.getItem(this.roleKey) as 'player'|'admin'|null) ?? null
  );
  readonly userRole$ = this.userRoleSubject.asObservable();
  readonly role = signal<'player'|'admin'|null>(this.userRoleSubject.value);

  constructor(private http: HttpClient) {
    this.userRole$.subscribe(r => this.role.set(r));
  }

  register(body: {
    username: string;
    email: string;
    password: string;
    role: string;
    totalDeposited?: { amount: number }[];
  }) {
    return this.http.post(`${environment.apiUrl}/auth/register`, body);
  }

login(body: { email: string; password: string }) {
  return this.http
    .post<{ token: string; user: { role: 'player' | 'admin' } }>(
      `${environment.apiUrl}/auth/login`,
      body
    )
    .pipe(
      tap(({ token, user }) => {
        const role = user.role;
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.roleKey, role);
        this.userRoleSubject.next(role);
      })
    );
}


  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.userRoleSubject.next(null);
  }

  isLoggedIn() { return !!localStorage.getItem(this.tokenKey); }
  getToken()   { return localStorage.getItem(this.tokenKey); }
  getUserRole(){ return localStorage.getItem(this.roleKey); }


  isAdminSync(): boolean { return this.role() === 'admin'; }
}
