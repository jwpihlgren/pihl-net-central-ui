import { InjectionToken } from "@angular/core";
import { WeatherAdapter } from "./weather.interface";

export const WEATHER_ADAPTER_TOKEN = new InjectionToken<WeatherAdapter>("WEATHER_ADAPTER_TOKEN")
