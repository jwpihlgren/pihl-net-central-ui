import { Component, computed, inject, signal, } from '@angular/core';
import { Pollen } from '../../../../shared/services/pollen';
import { PollenRegionalReport } from '../../../../shared/components/pollen-regional-report/pollen-regional-report';
import { HassTempSensorService } from '../../../../shared/services/hass-temp-sensor.service';
import { WeatherService } from '../../../../shared/services/weather.service';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { ChartOptions, RangeBarChart } from '../../../../shared/components/range-bar-chart/range-bar-chart';
import { WeatherForecast } from '../../../../shared/models/interfaces/weather-forecast.interface';
import { WeatherIcon } from '../../../../shared/components/weather-icon/weather-icon';


@Component({
  selector: 'app-logged-in',
  imports: [PollenRegionalReport, DatePipe, DecimalPipe, NgClass, RangeBarChart, WeatherIcon],
  templateUrl: './logged-in.html',
  styleUrl: './logged-in.css'
})
export class LoggedIn {
  pollenService = inject(Pollen)
  hassTempSensorService = inject(HassTempSensorService)
  weatherService = inject(WeatherService)
  forecastResource
  hassTemperatureResource
  hassTemperature = computed(() => this.hassTemperatureResource.value())
  weatherForecastResource = this.weatherService.forecastByCoordinates({ lat: 57.716666, lon: 11.966666 })

  openDetailsRow = signal<number | undefined>(undefined)


  constructor() {
    this.forecastResource = this.pollenService.forecast
    this.hassTemperatureResource = this.hassTempSensorService.temperature
    this.pollenService.forecastByRegionId()

  }

  toggleDetailsRow(event: Event) {
    const element = event.currentTarget as HTMLElement
    let rowId: number | undefined = parseInt(element.getAttribute("data-master-row-id") || "")
    if (isNaN(rowId)) rowId = undefined
    if (rowId === this.openDetailsRow()) rowId = undefined
    this.openDetailsRow.set(rowId)
  }
  weatherForecastAsData(forecast: WeatherForecast): Partial<ChartOptions> {
    const min = Math.min(...forecast.days.map(d => d.daily.temperatureMin)) - 10
    const max = Math.max(...forecast.days.map(d => d.daily.temperatureMax)) + 10

    return {
      series: [
        {
          name: "Temperature",
          data: forecast.days.map(d => ({
            x: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            y: [Math.round(d.daily.temperatureMin), Math.round(d.daily.temperatureMax) + 0.1]
          }))
        }
      ],
      yaxis: {
        min: Math.ceil(((min - 5)) / 5) * 5,
        max: Math.ceil(((max + 5)) / 5) * 5,
        decimalsInFloat: 0
      }
    }
  }
  weatherForecastAsIcons(forecast: WeatherForecast): string[] {
    return forecast.days.map(d => this.iconPaths[d.daily.weatherSymbol])
  }

  iconPaths = iconPaths
}

export const iconPaths: Record<number, string> = {
  // 1: Clear sun
  1: `
    <circle cx="12" cy="12" r="4" fill="#FFD700"/>
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
          stroke="#FFA500" stroke-width="1.5" stroke-linecap="round"/>
  `,

  // 2: Nearly clear (sun + small cloud)
  2: `
    <circle cx="9" cy="8" r="3" fill="#FFD700"/>
    <path d="M9 3v1.5M9 12.5v1.5M15 8h-1.5M3 8h1.5M13.5 4.5l-1.06 1.06M5.56 11.44l-1.06 1.06M13.5 11.5l-1.06-1.06M4.94 4.94l1.06 1.06"
          stroke="#FFA500" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M13 10a3.5 3.5 0 013.5 3.5h2a2.5 2.5 0 010 5H13a3.5 3.5 0 010-7z"
          fill="#E8E8E8" stroke="#B0B0B0" stroke-width="0.5"/>
  `,

  // 3: Variable cloudiness (partial sun + larger cloud)
  3: `
    <circle cx="8" cy="7" r="2.5" fill="#FFD700"/>
    <path d="M8 3v1.5M8 10.5v1.5M13 7h-1.5M3 7h1.5"
          stroke="#FFA500" stroke-width="1" stroke-linecap="round"/>
    <path d="M10 9a4 4 0 014 4h3a3 3 0 010 6H10a4 4 0 010-8z"
          fill="#E0E0E0" stroke="#A0A0A0" stroke-width="0.5"/>
    <path d="M15 8a2.5 2.5 0 012.5 2.5h1.5a2 2 0 010 4H15"
          fill="#E8E8E8" stroke="#B0B0B0" stroke-width="0.4" opacity="0.7"/>
  `,

  // 4: Half clear (larger single cloud)
  4: `
    <path d="M8 9a4 4 0 018 0h1.5a3 3 0 010 6H6.5a3 3 0 010-6H8z"
          fill="#E0E0E0" stroke="#A0A0A0" stroke-width="0.5"/>
  `,

  // 5: Cloudy (multiple clouds)
  5: `
    <path d="M6 11a4 4 0 018 0h2.5a3 3 0 010 6H5.5a3 3 0 010-6H6z"
          fill="#E0E0E0" stroke="#A0A0A0" stroke-width="0.5"/>
    <path d="M14 9a3 3 0 013 3h2a2.5 2.5 0 010 5h-2"
          fill="#E8E8E8" stroke="#B0B0B0" stroke-width="0.4" opacity="0.8"/>
  `,

  // 6: Overcast (dense clouds)
  6: `
    <path d="M5 11a4 4 0 018 0h3.5a3 3 0 010 6H4.5a3 3 0 010-6H5z"
          fill="#D5D5D5" stroke="#909090" stroke-width="0.5"/>
    <path d="M13 9a3 3 0 013 3h2.5a2.5 2.5 0 010 5H17"
          fill="#DCDCDC" stroke="#A0A0A0" stroke-width="0.4" opacity="0.9"/>
    <path d="M3 13a2.5 2.5 0 012.5-2.5h1"
          fill="none" stroke="#A0A0A0" stroke-width="0.4" opacity="0.6"/>
  `,

  // 7: Fog (horizontal lines)
  7: `
    <path d="M4 9h16M3 11h18M4 13h16M5 15h14M6 17h12"
          stroke="#B0B0B0" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
  `,

  // 8: Light rain showers
  8: `
    <circle cx="8" cy="6" r="2" fill="#FFD700" opacity="0.6"/>
    <path d="M8 3v1M11 6h-1" stroke="#FFA500" stroke-width="0.8" stroke-linecap="round" opacity="0.6"/>
    <path d="M10 8a3.5 3.5 0 017 0h1.5a2.5 2.5 0 010 5H9.5a2.5 2.5 0 010-5h.5z"
          fill="#E0E0E0" stroke="#A0A0A0" stroke-width="0.5"/>
    <path d="M10 15l-1 3M13 15l-1 3M16 15l-1 3"
          stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round"/>
  `,

  // 9: Moderate rain showers
  9: `
    <circle cx="8" cy="6" r="1.8" fill="#FFD700" opacity="0.5"/>
    <path d="M10 8a3.5 3.5 0 017 0h1.5a2.5 2.5 0 010 5H9.5a2.5 2.5 0 010-5h.5z"
          fill="#D8D8D8" stroke="#A0A0A0" stroke-width="0.5"/>
    <path d="M9 15l-1.5 4M12 15l-1.5 4M15 15l-1.5 4M18 15l-1.5 4"
          stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round"/>
  `,

  // 10: Heavy rain showers
  10: `
    <path d="M10 8a3.5 3.5 0 017 0h1.5a2.5 2.5 0 010 5H9.5a2.5 2.5 0 010-5h.5z"
          fill="#D0D0D0" stroke="#909090" stroke-width="0.5"/>
    <path d="M8 15l-1.5 5M11 15l-1.5 5M14 15l-1.5 5M17 15l-1.5 5M20 15l-1.5 5"
          stroke="#3A7BC8" stroke-width="1.8" stroke-linecap="round"/>
  `,

  // 11: Thunderstorm
  11: `
    <path d="M10 7a3.5 3.5 0 017 0h1.5a2.5 2.5 0 010 5H9.5a2.5 2.5 0 010-5h.5z"
          fill="#C8C8C8" stroke="#808080" stroke-width="0.5"/>
    <path d="M14 13l-2.5 4h2l-2 5 5-6h-2l2-3h-2.5z"
          fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
    <path d="M9 15l-1 2.5M18 15l-1 2.5"
          stroke="#4A90E2" stroke-width="1.2" stroke-linecap="round"/>
  `,

  // 12: Light sleet showers
  12: `
    <circle cx="8" cy="6" r="2" fill="#FFD700" opacity="0.6"/>
    <path d="M10 8a3.5 3.5 0 017 0h1.5a2.5 2.5 0 010 5H9.5a2.5 2.5 0 010-5h.5z"
          fill="#E0E0E0" stroke="#A0A0A0" stroke-width="0.5"/>
    <path d="M10 15l-1 2.5M16 15l-1 2.5"
          stroke="#4A90E2" stroke-width="1.3" stroke-linecap="round"/>
    <circle cx="13" cy="17" r="0.8" fill="#E0F0FF"/>
    <circle cx="13" cy="17" r="0.8" fill="none" stroke="#A0C8E8" stroke-width="0.4"/>
  `,

  // 13: Moderate sleet showers
  13: `
    <path d="M10 8a3.5 3.5 0 017 0h1.5a2.5 2.5 0 010 5H9.5a2.5 2.5 0 010-5h.5z"
          fill="#D8D8D8" stroke="#A0A0A0" stroke-width="0.5"/>
    <path d="M9 15l-1.5 3M15 15l-1.5 3M18 15l-1.5 3"
          stroke="#4A90E2" stroke-width="1.3" stroke-linecap="round"/>
    <circle cx="12" cy="17.5" r="0.8" fill="#E0F0FF" stroke="#A0C8E8" stroke-width="0.4"/>
    <circle cx="16.5" cy="18" r="0.8" fill="#E0F0FF" stroke="#A0C8E8" stroke-width="0.4"/>
  `,

  // 14: Heavy sleet showers
  14: `
    <path d="M10 8a3.5 3.5 0 017 0h1.5a2.5 2.5 0 010 5H9.5a2.5 2.5 0 010-5h.5z"
          fill="#D0D0D0" stroke="#909090" stroke-width="0.5"/>
    <path d="M8 15l-1.5 4M12 15l-1.5 4M16 15l-1.5 4M19 15l-1.5 4"
          stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="10" cy="18" r="0.8" fill="#E0F0FF" stroke="#A0C8E8" stroke-width="0.4"/>
    <circle cx="14" cy="18.5" r="0.8" fill="#E0F0FF" stroke="#A0C8E8" stroke-width="0.4"/>
    <circle cx="17.5" cy="18.5" r="0.8" fill="#E0F0FF" stroke="#A0C8E8" stroke-width="0.4"/>
  `,

  // 15: Light snow showers
  15: `
    <circle cx="8" cy="6" r="2" fill="#FFD700" opacity="0.5"/>
    <path d="M10 8a3.5 3.5 0 017 0h1.5a2.5 2.5 0 010 5H9.5a2.5 2.5 0 010-5h.5z"
          fill="#E0E0E0" stroke="#A0A0A0" stroke-width="0.5"/>
    <g stroke="#C0D8F0" stroke-width="1" stroke-linecap="round">
      <path d="M11 16v2M11 17h-1M11 17h1M10.5 16.5l.5.5M11.5 16.5l-.5.5M10.5 17.5l.5-.5M11.5 17.5l-.5-.5"/>
      <path d="M15 16v2M15 17h-1M15 17h1M14.5 16.5l.5.5M15.5 16.5l-.5.5M14.5 17.5l.5-.5M15.5 17.5l-.5-.5"/>
    </g>
  `,

  // 16: Moderate snow showers
  16: `
    <path d="M10 8a3.5 3.5 0 017 0h1.5a2.5 2.5 0 010 5H9.5a2.5 2.5 0 010-5h.5z"
          fill="#D8D8D8" stroke="#A0A0A0" stroke-width="0.5"/>
    <g stroke="#B0C8E0" stroke-width="1.1" stroke-linecap="round">
      <path d="M9 16v2M9 17h-1M9 17h1M8.5 16.5l.5.5M9.5 16.5l-.5.5M8.5 17.5l.5-.5M9.5 17.5l-.5-.5"/>
      <path d="M13 16v2M13 17h-1M13 17h1M12.5 16.5l.5.5M13.5 16.5l-.5.5M12.5 17.5l.5-.5M13.5 17.5l-.5-.5"/>
      <path d="M17 16v2M17 17h-1M17 17h1M16.5 16.5l.5.5M17.5 16.5l-.5.5M16.5 17.5l.5-.5M17.5 17.5l-.5-.5"/>
    </g>
  `,

  // 17: Heavy snow showers
  17: `
    <path d="M10 8a3.5 3.5 0 017 0h1.5a2.5 2.5 0 010 5H9.5a2.5 2.5 0 010-5h.5z"
          fill="#D0D0D0" stroke="#909090" stroke-width="0.5"/>
    <g stroke="#A0B8D0" stroke-width="1.2" stroke-linecap="round">
      <path d="M7 16v2.5M7 17.25h-1M7 17.25h1M6.4 16.4l.6.6M7.6 16.4l-.6.6M6.4 18.1l.6-.6M7.6 18.1l-.6-.6"/>
      <path d="M11 16v2.5M11 17.25h-1M11 17.25h1M10.4 16.4l.6.6M11.6 16.4l-.6.6M10.4 18.1l.6-.6M11.6 18.1l-.6-.6"/>
      <path d="M15 16v2.5M15 17.25h-1M15 17.25h1M14.4 16.4l.6.6M15.6 16.4l-.6.6M14.4 18.1l.6-.6M15.6 18.1l-.6-.6"/>
      <path d="M19 16v2.5M19 17.25h-1M19 17.25h1M18.4 16.4l.6.6M19.6 16.4l-.6.6M18.4 18.1l.6-.6M19.6 18.1l-.6-.6"/>
    </g>
  `,

  // 18: Light rain
  18: `
    <path d="M8 8a4.5 4.5 0 019 0h2a3 3 0 010 6H7a3 3 0 010-6h1z"
          fill="#E0E0E0" stroke="#A0A0A0" stroke-width="0.5"/>
    <path d="M10 15l-1 3M13 15l-1 3M16 15l-1 3"
          stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round"/>
  `,

  // 19: Moderate rain
  19: `
    <path d="M8 8a4.5 4.5 0 019 0h2a3 3 0 010 6H7a3 3 0 010-6h1z"
          fill="#D8D8D8" stroke="#A0A0A0" stroke-width="0.5"/>
    <path d="M9 15l-1.5 4M12 15l-1.5 4M15 15l-1.5 4M18 15l-1.5 4"
          stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round"/>
  `,

  // 20: Heavy rain
  20: `
    <path d="M8 8a4.5 4.5 0 019 0h2a3 3 0 010 6H7a3 3 0 010-6h1z"
          fill="#D0D0D0" stroke="#909090" stroke-width="0.5"/>
    <path d="M7 15l-1.5 5M10 15l-1.5 5M13 15l-1.5 5M16 15l-1.5 5M19 15l-1.5 5"
          stroke="#3A7BC8" stroke-width="1.8" stroke-linecap="round"/>
  `,

  // 21: Thunder
  21: `
    <path d="M13 4l-4 7h3l-3.5 9 8-10h-3l3.5-6h-4z"
          fill="#FFD700" stroke="#FFA500" stroke-width="0.8" stroke-linejoin="round"/>
  `,

  // 22: Light sleet
  22: `
    <path d="M8 8a4.5 4.5 0 019 0h2a3 3 0 010 6H7a3 3 0 010-6h1z"
          fill="#E0E0E0" stroke="#A0A0A0" stroke-width="0.5"/>
    <path d="M10 15l-1 2.5M16 15l-1 2.5"
          stroke="#4A90E2" stroke-width="1.3" stroke-linecap="round"/>
    <circle cx="13" cy="17" r="0.8" fill="#E0F0FF" stroke="#A0C8E8" stroke-width="0.4"/>
  `,

  // 23: Moderate sleet
  23: `
    <path d="M8 8a4.5 4.5 0 019 0h2a3 3 0 010 6H7a3 3 0 010-6h1z"
          fill="#D8D8D8" stroke="#A0A0A0" stroke-width="0.5"/>
    <path d="M9 15l-1.5 3M15 15l-1.5 3M18 15l-1.5 3"
          stroke="#4A90E2" stroke-width="1.3" stroke-linecap="round"/>
    <circle cx="12" cy="17.5" r="0.8" fill="#E0F0FF" stroke="#A0C8E8" stroke-width="0.4"/>
    <circle cx="16.5" cy="18" r="0.8" fill="#E0F0FF" stroke="#A0C8E8" stroke-width="0.4"/>
  `,

  // 24: Heavy sleet
  24: `
    <path d="M8 8a4.5 4.5 0 019 0h2a3 3 0 010 6H7a3 3 0 010-6h1z"
          fill="#D0D0D0" stroke="#909090" stroke-width="0.5"/>
    <path d="M8 15l-1.5 4M12 15l-1.5 4M16 15l-1.5 4M19 15l-1.5 4"
          stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="10" cy="18" r="0.8" fill="#E0F0FF" stroke="#A0C8E8" stroke-width="0.4"/>
    <circle cx="14" cy="18.5" r="0.8" fill="#E0F0FF" stroke="#A0C8E8" stroke-width="0.4"/>
    <circle cx="17.5" cy="18.5" r="0.8" fill="#E0F0FF" stroke="#A0C8E8" stroke-width="0.4"/>
  `,

  // 25: Light snow
  25: `
    <path d="M8 8a4.5 4.5 0 019 0h2a3 3 0 010 6H7a3 3 0 010-6h1z"
          fill="#E0E0E0" stroke="#A0A0A0" stroke-width="0.5"/>
    <g stroke="#C0D8F0" stroke-width="1" stroke-linecap="round">
      <path d="M11 16v2M11 17h-1M11 17h1M10.5 16.5l.5.5M11.5 16.5l-.5.5M10.5 17.5l.5-.5M11.5 17.5l-.5-.5"/>
      <path d="M15 16v2M15 17h-1M15 17h1M14.5 16.5l.5.5M15.5 16.5l-.5.5M14.5 17.5l.5-.5M15.5 17.5l-.5-.5"/>
    </g>
  `,

  // 26: Moderate snow
  26: `
    <path d="M8 8a4.5 4.5 0 019 0h2a3 3 0 010 6H7a3 3 0 010-6h1z"
          fill="#D8D8D8" stroke="#A0A0A0" stroke-width="0.5"/>
    <g stroke="#B0C8E0" stroke-width="1.1" stroke-linecap="round">
      <path d="M9 16v2M9 17h-1M9 17h1M8.5 16.5l.5.5M9.5 16.5l-.5.5M8.5 17.5l.5-.5M9.5 17.5l-.5-.5"/>
      <path d="M13 16v2M13 17h-1M13 17h1M12.5 16.5l.5.5M13.5 16.5l-.5.5M12.5 17.5l.5-.5M13.5 17.5l-.5-.5"/>
      <path d="M17 16v2M17 17h-1M17 17h1M16.5 16.5l.5.5M17.5 16.5l-.5.5M16.5 17.5l.5-.5M17.5 17.5l-.5-.5"/>
    </g>
  `,

  // 27: Heavy snow
  27: `
    <path d="M8 8a4.5 4.5 0 019 0h2a3 3 0 010 6H7a3 3 0 010-6h1z"
          fill="#D0D0D0" stroke="#909090" stroke-width="0.5"/>
    <g stroke="#A0B8D0" stroke-width="1.2" stroke-linecap="round">
      <path d="M7 16v2.5M7 17.25h-1M7 17.25h1M6.4 16.4l.6.6M7.6 16.4l-.6.6M6.4 18.1l.6-.6M7.6 18.1l-.6-.6"/>
      <path d="M11 16v2.5M11 17.25h-1M11 17.25h1M10.4 16.4l.6.6M11.6 16.4l-.6.6M10.4 18.1l.6-.6M11.6 18.1l-.6-.6"/>
      <path d="M15 16v2.5M15 17.25h-1M15 17.25h1M14.4 16.4l.6.6M15.6 16.4l-.6.6M14.4 18.1l.6-.6M15.6 18.1l-.6-.6"/>
      <path d="M19 16v2.5M19 17.25h-1M19 17.25h1M18.4 16.4l.6.6M19.6 16.4l-.6.6M18.4 18.1l.6-.6M19.6 18.1l-.6-.6"/>
    </g>
  `,
};
