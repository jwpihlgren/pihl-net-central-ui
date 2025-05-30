import { CountDescriptionValuePR } from "./count-description-value"

export interface PollenCountPR {
  pollenId: string | null
  regionid: string | null
  dailyCount: number | null
  countDescription: CountDescriptionValuePR | null
  technicalError: boolean
  //Date in UTC
  date: string
}
