import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<any[]>(`${environment.apiUrl}/roulette`);
  }
  detail(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/roulette/${id}`);
  }
  create(nombre: string) {
    return this.http.post(`${environment.apiUrl}/roulette/create`, { nombre });
  }
  open(id: string) {
    return this.http.patch(`${environment.apiUrl}/roulette/${id}/open`, {});
  }
  close(id: string) {
    return this.http.patch(`${environment.apiUrl}/roulette/${id}/close`, {});
  }
}
