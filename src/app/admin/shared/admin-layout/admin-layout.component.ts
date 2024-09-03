import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {

  constructor (
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

  }

  logout($event: Event) {
    $event?.preventDefault()
    this.auth.logout()
    this.router.navigate(["/admin", "login"])
  }
}
