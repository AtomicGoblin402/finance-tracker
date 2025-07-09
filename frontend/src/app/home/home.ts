import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  username: string | null = '';
  constructor(private router: Router) {
    this.username = localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
