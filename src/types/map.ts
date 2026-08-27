import { FeatureCollection, Geometry } from "geojson";

interface MapViewProps {
  countries: FeatureCollection<Geometry, CountryProperties>;
  highlightedCountryCodes: string[];
}

interface CountryProperties {
  "ISO3166-1-Alpha-3": string;
}

export type { MapViewProps, CountryProperties };
