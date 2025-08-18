import { Component } from '@angular/core';
import { GameService } from '../../../core/services/game';
import { Auth } from '../../../core/services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-round-list',
  imports: [ RouterLink ],
  templateUrl: './round-list.html',
  styleUrl: './round-list.css'
})
export class RoundList {
  rounds: any[] = [];
  error = '';

  constructor(private gameSvc: GameService, public auth: Auth) {}

  ngOnInit() {
    this.gameSvc.list().subscribe({
      next: (r) => this.rounds = r,
      error: () => this.error = 'No se pudieron cargar las rondas'
    });
  }
}
