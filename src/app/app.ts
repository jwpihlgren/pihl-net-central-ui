import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'pihl-net-central-ui';
  protected auth = inject(AuthService)

  loggedIn = toSignal(this.auth.user$)


  logout() {
    this.auth.logout({
      logoutParams: {
      }
    })
  }

}
