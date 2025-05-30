export interface PollenTypePR {
  id: string | null
  name: string
  //URL to a forecast filtering
  forecasts: string
  thresholdLow: number | null
  thresholdMedium: number | null
  thresholdHigh: number | null
  thresholdVeryHigh: number | null
}
