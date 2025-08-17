import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/services/auth';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [ReactiveFormsModule, RouterLink ],
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: Auth ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Forzamos los tipos a string para que coincidan con lo que espera el servicio
      this.auth.login({ email: email as string, password: password as string }).subscribe({
        next: () => {
          console.log('Login exitoso');
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al iniciar sesión';
        }
      });
    }
  }

  ngOnDestroy() {
    
  }
}
