// frontend/src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Define the base URL of our backend API
  private apiUrl = 'http://localhost:3000/api';

  // Inject the HttpClient so we can make requests
  constructor(private http: HttpClient) { }

  // Register method that takes user data and POSTs it to the backend
  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
