import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  profile() {
    return this.http.get<{ username: string; email: string; balance: number; totalDeposited: {amount: number; date: string}[] }>(
      `${environment.apiUrl}/profile`
    );
  }

  deposit(amount: number) {
    return this.http.patch<{ message:string; balance:number }>(
      `${environment.apiUrl}/users/deposit`, { amount }
    );
  }

  // Admin
  listUsers() {
    return this.http.get<any[]>(`${environment.apiUrl}/users`);
  }
  getUser(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/users/${id}`);
  }
}
