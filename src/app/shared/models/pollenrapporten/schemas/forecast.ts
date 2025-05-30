import { PollenLevelPR } from "./pollen-level"

export interface ForecastPR {
  id: string | null,
  regionid: string | null,
  startDate: string
  endDate: string
  text: string
  isEndOfSeason: boolean | null
  images: ImagePR[]
  levelSeries: PollenLevelPR[]
}

interface ImagePR {
  id: string
  pollenId: (string | null) | null
  url: string
}

