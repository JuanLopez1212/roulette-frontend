import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BetService {
  constructor(private http: HttpClient) {}

  placeBet(rouletteId: string, payload: { type:'numero'|'color'; value:number|string; amount:number }) {
    return this.http.post(`${environment.apiUrl}/${rouletteId}/bet`, {
      bets: [
        {
          type: payload.type,
          value: payload.value,
          amount: payload.amount
        }
      ]
    });
  }

  myBets() {
    return this.http.get<any[]>(`${environment.apiUrl}/bet/user`);
  }

  getBet(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/bets/${id}`);
  }
}
