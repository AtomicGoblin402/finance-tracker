import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          if (data.success) {
            // Store username in localStorage for use on home page
            localStorage.setItem('username', data.username);
            this.router.navigate(['/home']);
          } else {
            this.error = data.message || 'Login failed.';
          }
        },
        error: (err) => {
          this.error = err.error?.message || 'Login failed.';
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
