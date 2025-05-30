export const environment = {
  pollenrapporten: {
    url: "https://api.pollenrapporten.se/v1/",
    endpoints: {
      forecast: {
        path: "forecasts",
        params: {
          regionId: "region_id",
          pollenId: "pollen_id",
          current: "current",
          offset: "offset",
          limit: "limit",
          startDate: "start_date",
          endDate: "end_date",
        }
      },
      regions: "regions",
      pollenType: "pollen-types",
      pollenLevelDefinitions: "pollen-level-definitions",
      pollenCount: "pollen-count"
    }
  }
}


