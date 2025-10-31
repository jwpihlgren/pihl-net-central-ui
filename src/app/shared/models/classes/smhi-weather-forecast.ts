import { SMHIForecastTimeSerie, SMHIWeatherForecastResponse } from "../smhi/weather-forecast-response.interface";
import { DailyWeather, HourlyWeather, WeatherForecast, WeatherForecastCoordinates, WeatherForecastDay } from "../interfaces/weather-forecast.interface";
import { DateHelper } from "../../utils/date-helper";

export class SmhiWeatherForecast implements WeatherForecast {
  createdDate: Date
  referenceDate: Date
  regionName: string
  coordinates: WeatherForecastCoordinates[]
  days: WeatherForecastDay[]

  constructor(raw: SMHIWeatherForecastResponse) {
    const timeSeriesGroupedByDate: Partial<Record<string, SMHIForecastTimeSerie[]>> = Object.groupBy(raw.timeSeries, ({ time }) => {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      return new Date(`${year}-${month}-${day}`).toString()
    })

    this.createdDate = raw.createdTime
    this.referenceDate = raw.referenceTime
    this.coordinates = [{ lat: raw.geometry.coordinates[0][0], lon: raw.geometry.coordinates[0][1] }]
    this.regionName = ""
    this.days = []
    Object.entries(timeSeriesGroupedByDate).forEach(([k, v]) => {
      if (v) { this.days.push(this.mapTimeSeries(k, v)) }
    })
  }

  mapTimeSeries(date: string, timeSeries: SMHIForecastTimeSerie[]): WeatherForecastDay {
    const currentDate = new Date(date)
    const day: WeatherForecastDay = {
      date: currentDate,
      daily: this.generateDailyParameters(timeSeries),
      hourly: this.generateHourlyParameters(timeSeries)
    }

    return day
  }


  private calculateTotalProbability(probabilities: number[]): number {
    const probabilityOfNoOccurance = probabilities.reduce((acc, cur) => acc * (1 - cur), 1)
    const probabilityOfAtLeastOneOccurance = 1 - probabilityOfNoOccurance
    return probabilityOfAtLeastOneOccurance
  }

  private findMostCommonOccurance(occurances: number[]): number {
    const count = {} as Record<number, number>
    occurances.forEach(s => (count[s] ? count[s]++ : count[s] = 1))
    const mostCommonEntry = Object.entries(count).reduce((acc, cur) => (cur[1] > acc[1] ? cur : acc), Object.entries(count)[0])
    return mostCommonEntry[1]
  }


  generateDailyParameters(timeSeries: SMHIForecastTimeSerie[]): DailyWeather {

    const parametersAggregated = timeSeries.reduce((acc, serie) => {
      for (const key of Object.keys(serie.data) as (keyof typeof serie.data)[]) {
        const value = serie.data[key];
        (acc[key] ??= []).push(value);
      }
      return acc;
    }, {} as { [K in keyof SMHIForecastTimeSerie["data"]]: SMHIForecastTimeSerie["data"][K][] });

    const dailyWeather: DailyWeather = {
      date: DateHelper.dateTimeToDate(timeSeries[0].time),
      percipitationMax: Math.max(...parametersAggregated.precipitation_amount_max),
      percipitationMin: Math.min(...parametersAggregated.precipitation_amount_min),
      percipitationProbability: this.calculateTotalProbability(parametersAggregated.probability_of_precipitation),
      temperatureMax: Math.max(...parametersAggregated.air_temperature),
      temperatureMin: Math.min(...parametersAggregated.air_temperature),
      weatherSymbol: this.findMostCommonOccurance(parametersAggregated.symbol_code),
      windFromDirectionAsNumber: this.findMostCommonOccurance(parametersAggregated.wind_from_direction),
      windFromDirectionAsCompassHeading: this.compassDirection(this.findMostCommonOccurance(parametersAggregated.wind_from_direction)),
      windGust: Math.max(...parametersAggregated.wind_speed_of_gust),
      windSpeed: this.findMostCommonOccurance(parametersAggregated.wind_speed)
    }
    return dailyWeather
  }

  generateHourlyParameters(timeSeries: SMHIForecastTimeSerie[]): HourlyWeather[] {

    const hourlyWeather: HourlyWeather[] = timeSeries.map(t => ({
      percipitationMax: t.data.precipitation_amount_max,
      percipitationMin: t.data.precipitation_amount_min,
      percipitationPredominantType: t.data.predominant_precipitation_type_at_surface,
      percipitationProbability: t.data.probability_of_precipitation,
      time: t.time,
      weatherSymbol: t.data.symbol_code,
      windFromDirectionAsNumber: t.data.wind_from_direction,
      windFromDirectionAsCompassHeading: this.compassDirection(t.data.wind_from_direction),
      windGust: t.data.wind_speed_of_gust,
      windSpeed: t.data.wind_speed,
      airPressure: t.data.air_pressure_at_mean_sea_level,
      relativeHumidity: t.data.relative_humidity,
      temperature: t.data.air_temperature,
      temperatureFeelsLike: this.calculateFeelslike(
        t.data.air_temperature,
        t.data.relative_humidity,
        t.data.wind_speed
      ),
      visibility: t.data.visibility_in_air
    })
    )
    return hourlyWeather
  }

  private compassDirection(degrees: number) {
    if (degrees >= 360 - 22.5 || degrees <= 22.5) return "N"
    else if (degrees <= 22.5 * 3) return "NE"
    else if (degrees <= 22.5 * 5) return "E"
    else if (degrees <= 22.5 * 7) return "SE"
    else if (degrees <= 22.5 * 9) return "S"
    else if (degrees <= 22.5 * 11) return "SW"
    else if (degrees <= 22.5 * 13) return "W"
    else if (degrees <= 22.5 * 15) return "NW"
    throw new Error(`${degrees} is out of bounds of 0 an 360`)
  }

  private calculateFeelslike(temp: number, humidity: number, windSpeedMps: number): number {
    if (temp >= 27 && humidity >= 40) {
      const T = temp * 9 / 5 + 32;
      const R = humidity;

      const HI = -42.379 +
        2.04901523 * T +
        10.14333127 * R -
        0.22475541 * T * R -
        0.00683783 * T * T -
        0.05481717 * R * R +
        0.00122874 * T * T * R +
        0.00085282 * T * R * R -
        0.00000199 * T * T * R * R;

      return (HI - 32) * 5 / 9;
    }
    else {
      const windSpeedKmh = windSpeedMps * 3.6;
      if (temp < 10 && windSpeedKmh >= 4.8) {
        return 13.12 +
          0.6215 * temp -
          11.37 * Math.pow(windSpeedKmh, 0.16) +
          0.3965 * temp * Math.pow(windSpeedKmh, 0.16);
      }
    }
    return temp;
  }
}

