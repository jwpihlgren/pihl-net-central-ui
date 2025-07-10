import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { LoggedIn } from './components/logged-in/logged-in';
import { LoggedOut } from './components/logged-out/logged-out';
import { Pollen } from '../../shared/services/pollen';
import { PollenRegionalReport } from '../../shared/components/pollen-regional-report/pollen-regional-report';
import { PollenForecast } from '../../shared/models/interfaces/pollen-forecast';

@Component({
  selector: 'app-home',
  imports: [LoggedIn, LoggedOut, PollenRegionalReport],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  pollenService = inject(Pollen)
  forecastResource
  forecast = computed(() => this.forecastResource.value())

  constructor() {
    this.forecastResource = this.pollenService.forecast
    this.pollenService.forecastByRegionId()
  }

  loggedIn: WritableSignal<boolean> = signal(false)


  toggleLogin(event: Event): void {
    this.loggedIn.set(!this.loggedIn())
  }
}
