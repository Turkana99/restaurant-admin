import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    // Check if user is authenticated
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      // User is not authenticated, navigate to login page
      this.router.navigate(['/categories']);
      return false; // Prevent navigation to the requested route
    }

    // Check if the token is expired
    const token = localStorage.getItem('accessToken');
    if (token && !this.authService.isTokenExpired(token)) {
      // Token is expired, navigate to login page
      this.router.navigate(['/categories']);
      return false; // Prevent navigation to the requested route
    }

    // User is authenticated and token is not expired, allow navigation
    return true;
  }
}
