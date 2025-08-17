import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error = '';
  form = this.fb.nonNullable.group({
    email: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => this.error = e?.error?.message ?? 'Error al iniciar sesión',
    });
  }
}
