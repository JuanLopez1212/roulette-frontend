import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BetService } from '../../../core/services/bet';

@Component({
  selector: 'app-bet-list',
  imports: [ RouterLink ],
  templateUrl: './bet-list.html',
  styleUrl: './bet-list.css'
})
export class BetList {
  loading = true 
  bets: any[] = []
  error = ''

  constructor( private betsvc: BetService ) {}

  ngOnInit() {
    this.betsvc.myBets().subscribe({
      next: ( bets ) => {
        this.bets = bets,
        this.loading = false 
      },
      error: () => {
        this.error = 'Error al cargar las apuestas',
        this.loading = false 
      }
    })
  }
}
