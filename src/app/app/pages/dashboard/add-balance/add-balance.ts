import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../../core/services/auth';
import { environment } from '../../../environments/environment';
import { UserService } from '../../../core/services/user';

@Component({
  selector: 'app-add-balance',
  imports: [ ReactiveFormsModule ],
  templateUrl: './add-balance.html',
  styleUrl: './add-balance.css'
})
export class AddBalance {
    form: FormGroup;
  success = '';
  error = '';

  constructor( private fb: FormBuilder, private http: HttpClient, public auth: Auth, private userService: UserService ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  addBalance() {
    if( this.form.invalid ) return

    const amount = this.form.value.amount

    this.userService.deposit( amount ).subscribe({
      next: (res) => {
      this.success = `Se añadieron $${amount} al balance`;
      this.error = '';
      this.form.reset();
    },
    error: () => {
      this.error = 'No se pudo añadir el balance';
      this.success = '';
    }
    })
  }
}
