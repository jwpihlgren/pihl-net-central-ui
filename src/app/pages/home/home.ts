import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { LoggedIn } from './components/logged-in/logged-in';
import { LoggedOut } from './components/logged-out/logged-out';
import { Pollen } from '../../shared/services/pollen';
import { ForecastPR } from '../../shared/models/pollenrapporten/schemas/forecast';

@Component({
  selector: 'app-home',
  imports: [LoggedIn, LoggedOut],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  pollenService = inject(Pollen)
  forecast

  constructor() {
    this.forecast = this.pollenService.forecast
    this.pollenService.forecastByRegionId()
  }

  loggedIn: WritableSignal<boolean> = signal(false)


  toggleLogin(event: Event): void {
    this.loggedIn.set(!this.loggedIn())
  }
}
