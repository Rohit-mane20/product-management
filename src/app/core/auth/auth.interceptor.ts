import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

  constructor(@Inject(AuthService) private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = this.addAuthHeader(request);
    
    return next.handle(authReq);
  }

  private addAuthHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const authHeader = this.authService.getAuthHeader();

    if (!authHeader || request.url.includes('/login')) {
      return request;
    }

    return request.clone({
      setHeaders: { Authorization: authHeader }
    });
  }
}