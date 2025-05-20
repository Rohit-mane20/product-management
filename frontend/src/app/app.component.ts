import { Component, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'Product Management';
  isLoggedIn = false;

  constructor(private auth: AuthService) {
    // Use effect to react to auth state changes
    effect(() => {
      this.isLoggedIn = !!this.auth.currentUser();
    });
  }

  ngOnInit() {
    // Initial check
    this.isLoggedIn = this.auth.isLoggedIn();
  }
}
 