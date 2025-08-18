import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../../core/services/game';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-round-detail',
  imports: [],
  templateUrl: './round-detail.html',
  styleUrl: './round-detail.css'
})
export class RoundDetail {
  round: any = null;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private gameSvc: GameService,
    public auth: Auth
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.gameSvc.detail(id).subscribe({
      next: (r) => this.round = r,
      error: () => this.error = 'No se pudo cargar la ronda'
    });
  }

  openRound(id: string) {
    this.gameSvc.open(id).subscribe(() => {
      if (this.round) this.round.status = 'open';
    });
  }

  closeRound(id: string) {
    this.gameSvc.close(id).subscribe(() => {
      if (this.round) this.round.status = 'finished';
    });
  }
}
