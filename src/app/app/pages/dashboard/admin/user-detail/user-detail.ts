import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [ JsonPipe ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail {
  user: any
  error = ''

  constructor( private route: ActivatedRoute, private userSvc: UserService ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get( 'id' )!
    this.userSvc.getUser( id ).subscribe({
      next: ( u ) => this.user = u,
      error: () => this.error = 'No se pudo cargar el usuario'
    })
  }
}
