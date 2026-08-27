import type { PathOptions } from "leaflet";

const countryStyle: PathOptions = {
  color: "#c8c8c8",
  weight: 0.7,
  fillColor: "#ffffff",
  fillOpacity: 1,
};

const highlightedCountryStyle: PathOptions = {
  color: "#b00000",
  weight: 0.9,
  fillColor: "#ff0000",
  fillOpacity: 1,
};

export { countryStyle, highlightedCountryStyle };
