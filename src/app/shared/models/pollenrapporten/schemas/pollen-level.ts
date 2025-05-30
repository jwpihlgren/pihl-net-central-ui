import { PollenLevelValuePR } from "./pollen-level-value"

export interface PollenLevelPR {
  pollenId: string | null
  level: PollenLevelValuePR
  time: string
}
