import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from '../../../core/services/game';

@Component({
  selector: 'app-round-form',
  imports: [ ReactiveFormsModule ],
  templateUrl: './round-form.html',
  styleUrl: './round-form.css'
})
export class RoundForm {
  form: FormGroup;
  msg = '';
  error = '';

  constructor(private fb: FormBuilder, private gameSvc: GameService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  submit() {
    this.msg = '';
    this.error = '';

    if (this.form.invalid) {
      this.error = 'Debes ingresar un nombre válido';
      return;
    }

    this.gameSvc.create(this.form.value.nombre).subscribe({
      next: () => {
        this.msg = 'Ronda creada';
        this.form.reset();
      },
      error: (e) => this.error = e?.error?.message ?? 'Error al crear ronda'
    });
  }
}
