import { Component, input, signal } from '@angular/core';
import { WeatherIcon } from '../weather-icon/weather-icon';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { WeatherForecast } from '../../models/interfaces/weather-forecast.interface';
import { ChartOptions } from '../range-bar-chart/range-bar-chart';

@Component({
  selector: 'app-daily-weather-table',
  imports: [WeatherIcon, DecimalPipe, DatePipe, NgClass],
  templateUrl: './daily-weather-table.html',
  styleUrl: './daily-weather-table.css'
})
export class DailyWeatherTable {

  forecast = input.required<WeatherForecast>()
  openDetailsRow = signal<number | undefined>(undefined)

  toggleDetailsRow(event: Event) {
    const element = event.currentTarget as HTMLElement
    let rowId: number | undefined = parseInt(element.getAttribute("data-master-row-id") || "")
    if (isNaN(rowId)) rowId = undefined
    if (rowId === this.openDetailsRow()) rowId = undefined
    this.openDetailsRow.set(rowId)
  }


}


