import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { Auth } from './app/core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [Auth]
})
export class App {
  protected readonly title = signal('frontend');
  constructor(@Inject(Auth) public auth: Auth ) {}

  logout() {
    this.auth.logout();
  }
}