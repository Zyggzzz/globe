"use client";

import dynamic from "next/dynamic";
import type { FeatureCollection, Geometry } from "geojson";
import MapLoading from "@/components/map/map-loading";
import { CountryProperties } from "@/types/map";

const MapView = dynamic(() => import("@/components/map/map-view"), {
  loading: () => <MapLoading />,
  ssr: false,
});

interface MapLoaderProps {
  countries: FeatureCollection<Geometry, CountryProperties>;
  highlightedCountryCodes: string[];
}

export default function MapLoader({ countries, highlightedCountryCodes }: MapLoaderProps) {
  return <MapView countries={countries} highlightedCountryCodes={highlightedCountryCodes} />;
}
