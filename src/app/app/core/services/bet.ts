import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BetService {
  constructor(private http: HttpClient) {}

  placeBet(rouletteId: string, payload: { tipoApuesta:'numero'|'color'; valor:number|string; monto:number }) {
    return this.http.post(`${environment.apiUrl}/bets/${rouletteId}/bet`, payload);
  }

  myBets() {
    return this.http.get<any[]>(`${environment.apiUrl}/bet/user`);
  }

  getBet(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/bets/${id}`);
  }
}
