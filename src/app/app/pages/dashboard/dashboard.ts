import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ RouterOutlet, RouterLink,  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor( public auth: Auth) {}
}
