import { effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSignal = signal<User | false>(false);
  /** Stored Basic auth header for HTTP interceptor */
  private authHeader: string | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    // Initialize state from localStorage
    const storedUser = localStorage.getItem('currentUser');
    const storedAuthHeader = localStorage.getItem('authHeader');
    
    if (storedUser) {
      this.currentUserSignal.set(JSON.parse(storedUser));
    }
    if (storedAuthHeader) {
      this.authHeader = storedAuthHeader;
    }

    effect(() => {
      const currentUser = this.currentUserSignal();
      if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('currentUser');
      }
    });
  }

  // Perform login and store user in signal
  login(username: string, password: string): Observable<User> {
    // Prepare and store Basic auth header
    this.authHeader = 'Basic ' + btoa(`${username}:${password}`);
    localStorage.setItem('authHeader', this.authHeader);
    
    return this.http
      .post<User>(`${environment.apiUrl}/login`, { username, password })
      .pipe(
        tap((user: User) => {
          this.currentUserSignal.set(user);
        })
      );
  }

  // Retrieve the stored Authorization header
  getAuthHeader(): string | null {
    return this.authHeader;
  }

  // Clear the stored user
  logout(): void {
    this.currentUserSignal.set(false);
    this.authHeader = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authHeader');
    this.router.navigate(['/login']);
  }

  // Return the current user value
  currentUser(): User | false {
    return this.currentUserSignal();
  }

  // Convenience to check if logged in
  isLoggedIn(): boolean {
    return !!this.currentUserSignal();
  }
} 