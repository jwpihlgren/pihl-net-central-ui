import { CompassHeadingPipe } from "./compass-heading-pipe";
import { WEATHER_ADAPTER_TOKEN } from "./weather.token";
import {
  WeatherForecast,
  WeatherTimestamp,
  Coordinates,
  SummaryMultipleDayForecast,
  SummaryDayForecast,
  DetailedMultipleDayForecast,
  DetailedDayForecast,
  DetailedHourForecast,
  WeatherAdapter
} from "./weather.interface";
import { getWeatherIcon } from "./weather-icon-paths";


export type {
  WeatherForecast,
  WeatherTimestamp,
  Coordinates,
  SummaryMultipleDayForecast,
  SummaryDayForecast,
  DetailedMultipleDayForecast,
  DetailedDayForecast,
  DetailedHourForecast,
  WeatherAdapter
}


export { CompassHeadingPipe, WEATHER_ADAPTER_TOKEN, getWeatherIcon }

