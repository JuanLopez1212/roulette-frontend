import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user';

@Component({
  selector: 'app-user-list',
  imports: [ RouterLink ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {
  users: any[] = []
  error = ''

  constructor( private userSvc: UserService ) {}

  ngOnInit() {
    this.userSvc.listUsers().subscribe({
      next: (u) => this.users = u,
      error: () => this.error = 'No se pudieron cargar los usuarios'
    })
  }
}
