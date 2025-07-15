import { Component, inject } from '@angular/core';
import { LoggedIn } from './components/logged-in/logged-in';
import { LoggedOut } from './components/logged-out/logged-out';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [LoggedIn, LoggedOut],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  protected auth = inject(AuthService)
  loggedIn = toSignal(this.auth.user$)
  constructor() { }

}
