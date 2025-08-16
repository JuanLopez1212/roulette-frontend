import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth)
  const token = auth.getToken()

  if (token) {
    req = req.clone( {setHeaders: { 'x-token': token }} )
  }

  return next(req)
};
