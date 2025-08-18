import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ DatePipe ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  data: any;
  error = '';

  constructor(private userSvc: UserService ) {}

  ngOnInit() {
    this.userSvc.profile().subscribe({
      next: (d) => this.data = d,
      error: () => this.error = 'No se pudo cargar el perfil'
    });
  }
}
