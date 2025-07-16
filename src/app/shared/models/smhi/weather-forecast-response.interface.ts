export interface WeatherForecastResponse {
  approvedTime: Date
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
  timeSeries: [
    {
      validTime: Date,
      parameters: {
        name: ParameterName,
        levelType: "hl" | "hmsl",
        level: number,
        unit: keyof typeof wUnits | "code" | "category",
        values: number[]
      }[],
    }]
}

export interface WeatherParameters {
  parameter: Parameter[]
}

type ParameterName = "t" | "wd" | "ws" | "gust" | "r" | "msl" | "vis" | "tstm" | "tcc_mean" | "lcc_mean" | "mcc_mean" | "hcc_mean" | "pmean" | "pmin" | "pmax" | "pmedian" | "spp" | "pcat" | "Wsymb2" | "tp"


const wUnits: Record<string, string> = {
  "cel": "C",
  "degree": "degree",
  "m/s": "m/s",
  "percent": "%",
  "hPa": "hPa",
  "km": "km",
  "octas": "octas",
  "kg/m2/h": "mm/h",
  "category": "category",
  "kg/m2": "mm"
} as const

export const wPcats = ["No precipitation", "Snow", "Snow and rain", "Rain", "Drizzle", "Freezing rain", "Freezing drizzle"] as const

export const wLevelTypes: Record<string, string> = {
  "hl": "Hight above ground level",
  "hmsl": "Hight above sea level"
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
};


export type Parameter = {
  name: ParameterName
  shortName: string
  description: string
  levelType: string
  level: number
  unit: string,
  missingValue: number
}



