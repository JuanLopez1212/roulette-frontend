
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('x-token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        'x-token': token
      }
    });
    return next(cloned);
  }

  return next(req);
};
