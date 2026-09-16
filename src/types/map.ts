import { FeatureCollection, Geometry } from "geojson";

interface MapViewProps {
  countries: FeatureCollection<Geometry, CountryProperties>;
  highlightedCountryCodes: string[];
}

interface CountryProperties {
  name: string;
  "ISO3166-1-Alpha-2": string;
  "ISO3166-1-Alpha-3": string;
}

export type { MapViewProps, CountryProperties };
