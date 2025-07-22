import { SMHIForecastTimeSerie, SMHIForecastTimeSerieParameter, SMHIParameterName, SMHIWeatherForecastResponse } from "../smhi/weather-forecast-response.interface";
import { WeatherForecast, WeatherForecastCoordinates, WeatherForecastDailyTable, WeatherForecastDay, WeatherForecastHourlyTable } from "../weather-forecast.interface";

export class SmhiWeatherForecast implements WeatherForecast {
  issuedTime: Date
  regionName: string
  coordinates: WeatherForecastCoordinates[]

  days: WeatherForecastDay[]

  constructor(raw: SMHIWeatherForecastResponse) {
    const timeSeriesGroupedByDate: Partial<Record<string, SMHIForecastTimeSerie[]>> = Object.groupBy(raw.timeSeries, ({ validTime }) => {
      const date = new Date(validTime)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      return new Date(`${year}-${month}-${day}`).toString()
    })

    this.issuedTime = raw.referenceTime
    this.coordinates = [{ lat: raw.geometry.coordinates[0][0], lon: raw.geometry.coordinates[0][1] }]
    this.regionName = ""
    this.days = []
    Object.entries(timeSeriesGroupedByDate).forEach(([k, v]) => {
      if (v) { this.days.push(this.mapTimeSeries(k, v)) }
    })
  }

  mapTimeSeries(date: string, timeSeries: SMHIForecastTimeSerie[]): WeatherForecastDay {
    const day: WeatherForecastDay = {
      date: new Date(date),
      parameters: this.generateDailyParameters(timeSeries),
      hours: this.generateHourlyParameters(timeSeries)
    }

    return day
  }

  generateDailyParameters(timeSeries: SMHIForecastTimeSerie[]): WeatherForecastDailyTable {

    const dailyHeaders = { day: "day", symbol: "", percipitation: "L/H", wind: "wind", visibility: "visibility", temp: "temperature" }
    const groupedParams: Record<SMHIParameterName, SMHIForecastTimeSerieParameter[]> = timeSeries.reduce((acc, cur) => {
      cur.parameters.forEach(p => acc[p.name] ? acc[p.name].push(p) : acc[p.name] = [p])
      return acc
    }, {} as Record<SMHIParameterName, SMHIForecastTimeSerieParameter[]>)

    const minTemp = Math.min(...groupedParams.t.map(p => p.values[0]))
    const maxTemp = Math.max(...groupedParams.t.map(p => p.values[0]))
    const windDirection = groupedParams.wd.map(p => p.values[0]).reduce((acc, cur) => acc + cur) / groupedParams.wd.length
    const windSpeed = groupedParams.ws.map(p => p.values[0]).reduce((acc, cur) => acc + cur) / groupedParams.ws.length
    const windGust = groupedParams.gust.map(p => p.values[0]).reduce((acc, cur) => acc + cur) / groupedParams.gust.length
    const minPercipitation = groupedParams.pmin.map(p => p.values[0]).reduce((acc, cur) => acc + cur)
    const maxPercipitation = groupedParams.pmax.map(p => p.values[0]).reduce((acc, cur) => acc + cur)
    const countOfSymbolValue = groupedParams.Wsymb2.map(p => p.values[0]).reduce((acc, cur) => {
      acc.symbolCount[cur] ?
        acc.symbolCount[cur] += 1 :
        acc.symbolCount[cur] = 1;
      if (acc.symbolCount[cur] > (acc.symbolCount[acc.max] ?? 0)) acc.max = cur
      return acc
    }, { symbolCount: {} as Record<number, number>, max: 0 })
    const symbol = countOfSymbolValue.symbolCount[countOfSymbolValue.max]
    const day = new Date(timeSeries[0].validTime)

    const parameters: WeatherForecastDailyTable = {
      headers: dailyHeaders,
      rows: {
        day: day,
        symbol: symbol,
        temp: { min: minTemp, max: maxTemp, unit: groupedParams.t[0].unit },
        wind: { direction: this.compassDirection(windDirection), speed: windSpeed, gust: windGust, unit: groupedParams.ws[0].unit },
        percipitation: { min: minPercipitation, max: maxPercipitation, unit: groupedParams.pmin[0].unit }
      }
    }

    return parameters
  }

  generateHourlyParameters(t: SMHIForecastTimeSerie[]): WeatherForecastHourlyTable[] {
    return t.map(t => this.mapHours(t))
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


  mapHours(h: SMHIForecastTimeSerie): WeatherForecastHourlyTable {

    const hourlyHeaders = {
      hour: "hour",
      symbol: "weather",
      percipitation: "percipitation",
      wind: "wind",
      feelsLike: "feels like",
      humidity: "humidity",
      airpressure: "airpressure",
      visibility: "visibility",
      temp: "Temperature"
    }
    const temp = h.parameters.find(p => p.name === "t")!
    const windDirection = h.parameters.find(p => p.name === "wd")!
    const windSpeed = h.parameters.find(p => p.name === "ws")!
    const windGust = h.parameters.find(p => p.name === "gust")!
    const percipitation = h.parameters.find(p => p.name === "pmean")!
    const airPressure = h.parameters.find(p => p.name === "msl")!
    const visibility = h.parameters.find(p => p.name === "vis")!
    const symbol = h.parameters.find(p => p.name === "Wsymb2")!
    const humidity = h.parameters.find(p => p.name === "r")!
    const feelsLike = this.calculateFeelslike(temp.values[0], humidity.values[0], windSpeed.values[0])

    const parameters: WeatherForecastHourlyTable = {
      headers: hourlyHeaders,
      rows: {
        hour: new Date(h.validTime),
        symbol: symbol.values[0],
        temp: { value: temp.values[0], unit: temp.unit },
        wind: { direction: this.compassDirection(windDirection.values[0]), speed: windSpeed.values[0], gust: windGust.values[0], unit: windSpeed.unit },
        percipitation: percipitation.values[0],
        feelsLike: feelsLike,
        humidity: humidity.values[0],
        airpressure: airPressure.values[0],
        visibility: visibility.values[0],
      }
    }

    return parameters
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

