import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'pihl-net-central-ui';
  protected auth = inject(AuthService)

  loggedIn = signal(false)


  toggleLogin(event: Event): void {
    this.auth.session() ? this.auth.logout() : this.auth.login()
  }

}
