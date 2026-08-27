"use client";

import type { Feature as GeoJsonFeature, Geometry } from "geojson";
import { GeoJSON, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { countryStyle, highlightedCountryStyle } from "@/styles/map";
import { CountryProperties, MapViewProps } from "@/types/map";

export default function MapView({ countries, highlightedCountryCodes }: MapViewProps) {
  const highlightedCountries = new Set(highlightedCountryCodes);

  function getCountryStyle(feature?: GeoJsonFeature<Geometry, CountryProperties>) {
    const countryCode = feature?.properties["ISO3166-1-Alpha-3"];

    return countryCode && highlightedCountries.has(countryCode) ? highlightedCountryStyle : countryStyle;
  }

  return (
    <MapContainer center={[20, 0]} zoom={2} minZoom={1} maxZoom={8} className="h-screen w-screen" scrollWheelZoom={true}>
      <GeoJSON data={countries} style={getCountryStyle} />
    </MapContainer>
  );
}
