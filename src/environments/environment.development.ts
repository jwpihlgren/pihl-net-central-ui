export const environment = {
  pollenrapporten: {
    url: "https://api.pollenrapporten.se/v1/",
    endpoints: {
      forecast: "forecasts",
      regions: "regions",
      pollenType: "pollen-types",
      pollenLevelDefinitions: "pollen-level-definitions",
      pollenCount: "pollen-count"
    }
  },
  storage: {
    pollenTypePrefix: "pollen-types",
    pollenRegionPrefix: "pollen-regions",
    pollenForecastPrefix: "pollen-forecast",
    pollenForecastTTLInMs: 1000 * 60 * 60 * 2
  }
}


