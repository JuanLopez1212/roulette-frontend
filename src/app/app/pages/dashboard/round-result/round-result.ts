import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../../core/services/game';

@Component({
  selector: 'app-round-result',
  imports: [],
  templateUrl: './round-result.html',
  styleUrl: './round-result.css'
})
export class RoundResult {
  round: any; error='';

  constructor(private route: ActivatedRoute, private gameSvc: GameService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.gameSvc.detail(id).subscribe({
      next: (r) => this.round = r,
      error: () => this.error = 'No se pudo cargar el resultado'
    });
  }
}
