import type { PathOptions } from "leaflet";

const countryStyle: PathOptions = {
  color: "var(--map-country-border)",
  weight: 0.7,
  fillColor: "var(--map-country)",
  fillOpacity: 1,
};

const highlightedCountryStyle: PathOptions = {
  color: "var(--map-highlighted-country-border)",
  weight: 0.9,
  fillColor: "var(--map-highlighted-country)",
  fillOpacity: 1,
};

export { countryStyle, highlightedCountryStyle };
