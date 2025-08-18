import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BetService } from '../../../core/services/bet';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-bet-detail',
  imports: [ JsonPipe ],
  templateUrl: './bet-detail.html',
  styleUrl: './bet-detail.css'
})
export class BetDetail {
  bet: any;
  error = '';

  constructor(private route: ActivatedRoute, private betSvc: BetService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.betSvc.getBet(id).subscribe({
      next: (b) => this.bet = b,
      error: () => this.error = 'No se pudo cargar la apuesta'
    });
  }
}
