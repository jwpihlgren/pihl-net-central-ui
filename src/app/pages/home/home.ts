import { Component, signal, WritableSignal } from '@angular/core';
import { LoggedIn } from './components/logged-in/logged-in';
import { LoggedOut } from './components/logged-out/logged-out';

@Component({
  selector: 'app-home',
  imports: [LoggedIn, LoggedOut],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  loggedIn: WritableSignal<boolean> = signal(false)


  toggleLogin(event: Event): void {
    this.loggedIn.set(!this.loggedIn())
  }
}
