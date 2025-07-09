import { Component, OnInit } from '@angular/core';
//import ReactiveFormsModule
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
// 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class RegisterComponent implements OnInit {
  // The rest of the code from Step 4 remains exactly the same!
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        // On successful registration, log in the user automatically
        this.authService.login(this.registerForm.value).subscribe({
          next: (data: any) => {
            if (data.success) {
              localStorage.setItem('username', data.username);
              this.router.navigate(['/home']);
            } else {
              alert(data.message || 'Login failed.');
            }
          },
          error: (err) => {
            alert(err.error?.message || 'Login failed.');
          }
        });
      },
      error: (err) => {
        // Handle error (show message, etc.)
        alert('Registration failed! ' + (err.error?.message || ''));
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
