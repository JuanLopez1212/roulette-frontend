import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BetService } from '../../../core/services/bet';
import { GameService } from '../../../core/services/game';


@Component({
  standalone: true,
  selector: 'app-bet-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bet-form.html',
  styleUrls: ['./bet-form.css']
})
export class BetForm {
  form!: FormGroup;
  rounds: any[] = [];
  msg = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private betSvc: BetService,
    private gameSvc: GameService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      rouletteId: ['', Validators.required],
      tipoApuesta: ['numero', Validators.required],
      valor: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(1)]],
    });

    this.gameSvc.list().subscribe({
      next: (r) => this.rounds = r,
      error: () => this.error = 'No se pudieron cargar las ruletas'
    });
  }

  submit(): void {
    this.msg = '';
    this.error = '';

    if (this.form.invalid) {
      this.error = 'Completa el formulario correctamente';
      return;
    }

    const v = this.form.value;

    this.betSvc.placeBet(v.rouletteId, {
      tipoApuesta: v.tipoApuesta,
      valor: v.valor,
      monto: v.monto
    }).subscribe({
      next: () => this.msg = '✅ Apuesta realizada correctamente',
      error: (e) => this.error = e?.error?.message ?? '❌ Error al realizar apuesta'
    });
  }
}
