export interface SMHIWeatherForecastResponse {
  createdTime: Date
  referenceTime: Date
  geometry: {
    type: string
    coordinates: [
      [
        number,
        number
      ]
    ]
  },
  timeSeries: SMHIForecastTimeSerie[]
}


export interface SMHIForecastTimeSerie {
  time: Date
  intervalParametersStartTime: Date
  data: {
    air_temperature: number
    wind_from_direction: number
    wind_speed: number
    wind_speed_of_gust: number
    relative_humidity: number
    air_pressure_at_mean_sea_level: number
    visibility_in_air: number
    thunderstorm_probability: number
    probability_of_frozen_precipitation: number
    cloud_area_fraction: number
    low_type_cloud_area_fraction: number
    medium_type_cloud_area_fraction: number
    high_type_cloud_area_fraction: number
    cloud_base_altitude: number
    cloud_top_altitude: number
    precipitation_amount_mean: number
    precipitation_amount_min: number
    precipitation_amount_max: number
    precipitation_amount_median: number
    probability_of_precipitation: number
    precipitation_frozen_part: number
    predominant_precipitation_type_at_surface: number
    symbol_code: number
  }
}

export const parameters = {
  air_pressure_at_mean_sea_level: {
    shortName: "pres",
    description: "Air pressure at mean sea level.",
    level: 0,
    unit: "hPa",
  },
  air_temperature: {
    shortName: "2t",
    description: "Air temperature at 2 metres height.",
    level: 2,
    unit: "Cel",
  },
  cloud_area_fraction: {
    shortName: "tcc",
    description: "Total Cloud Cover",
    level: 2,
    unit: "octas",
  },
  cloud_base_altitude: {
    shortName: "cdcb",
    description: "Cloud base altitude.",
    level: 2,
    unit: "m",
  },
  cloud_top_altitude: {
    shortName: "cdct",
    description: "Cloud top altitude.",
    level: 2,
    unit: "m",
  },
  high_type_cloud_area_fraction: {
    shortName: "hcc",
    description: "High cloud cover",
    level: 2,
    unit: "octas",
  },
  low_type_cloud_area_fraction: {
    shortName: "lcc",
    description: "Low cloud cover",
    level: 2,
    unit: "octas",
  },
  medium_type_cloud_area_fraction: {
    shortName: "mcc",
    description: "Medium cloud cover",
    level: 2,
    unit: "octas",
  },
  precipitation_amount_max: {
    shortName: "tpratemax",
    description: "Maximum total precipitation amount",
    level: 0,
    unit: "kg/m2",
  },
  precipitation_amount_mean: {
    shortName: "tpratemean",
    description: "Mean total precipitation amount",
    level: 0,
    unit: "kg/m2",
  },
  precipitation_amount_median: {
    shortName: "tpratemedian",
    description: "Median total precipitation amount",
    level: 0,
    unit: "kg/m2",
  },
  precipitation_amount_min: {
    shortName: "tpratemin",
    description: "Minimum total precipitation amount",
    level: 0,
    unit: "kg/m2",
  },
  precipitation_frozen_part: {
    shortName: "spp",
    description: "Frozen part of precipitation.",
    level: 0,
    unit: "fraction",
  },
  predominant_precipitation_type_at_surface: {
    shortName: "ptype",
    description: "Precipitation type",
    level: 0,
    unit: "category",
  },
  probability_of_frozen_precipitation: {
    shortName: "fzpr",
    description: "Probability of frozen precipitation.",
    level: 0,
    unit: "fraction",
  },
  probability_of_precipitation: {
    shortName: "tp_gt_0p1",
    description: "Propability of precipitation of at least 0.1 mm",
    level: 0,
    unit: "%",
  },
  relative_humidity: {
    shortName: "2r",
    description: "Relative humidity at 2 metres height.",
    level: 2,
    unit: "percent",
  },
  symbol_code: {
    shortName: "Wsymb2",
    description: "Weather symbol code with 27 different codes.",
    level: 0,
    unit: "unknown",
  },
  thunderstorm_probability: {
    shortName: "tstm",
    description: "Thunderstorm probability",
    level: 0,
    unit: "fraction",
  },
  visibility_in_air: {
    shortName: "vis",
    description: "Visibility in air.",
    level: 2,
    unit: "km",
  },
  wind_from_direction: {
    shortName: "wd",
    description: "Wind from direction at 10 metre.",
    level: 10,
    unit: "degree",
  },
  wind_speed: {
    shortName: "ws",
    description: "Wind speed at 10 metre.",
    level: 10,
    unit: "m/s",
  },
  wind_speed_of_gust: {
    shortName: "i10fg",
    description: "Instantaneous 10 metre wind gust",
    level: 10,
    unit: "m s**-1",
  },
} as const

export const precipitationType = {
  0: "No precipitation",
  1: "Rain",
  2: "Thunderstorm",
  3: "Freezing rain (i.e. supercooled raindrops which freeze on contact with the ground and other surfaces)",
  4: "Mixed/ice",
  5: "Snow",
  6: "Wet snow (i.e. snow particles which are starting to melt)",
  7: "Mixture of rain and snow",
  8: "Ice pellets",
  9: "Graupel",
  10: "Hail",
  11: "Drizzle",
  12: "Freezing drizzle (i.e. supercooled drizzle which freezes on contact with the ground and other surfaces)",
} as const


export const wWsymb2: Record<number, string> = {
  1: "Clear sky",
  2: "Nearly clear sky",
  3: "Variable cloudiness",
  4: "Halfclear sky",
  5: "Cloudy sky",
  6: "Overcast",
  7: "Fog",
  8: "Light rain showers",
  9: "Moderate rain showers",
  10: "Heavy rain showers",
  11: "Thunderstorm",
  12: "Light sleet showers",
  13: "Moderate sleet showers",
  14: "Heavy sleet showers",
  15: "Light snow showers",
  16: "Moderate snow showers",
  17: "Heavy snow showers",
  18: "Light rain",
  19: "Moderate rain",
  20: "Heavy rain",
  21: "Thunder",
  22: "Light sleet",
  23: "Moderate sleet",
  24: "Heavy sleet",
  25: "Light snowfall",
  26: "Moderate snowfall",
  27: "Heavy snowfall"
} as const

