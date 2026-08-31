"use client";

import type { Feature as GeoJsonFeature, Geometry } from "geojson";
import { GeoJSON, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { countryStyle, highlightedCountryStyle } from "@/styles/map";
import { CountryProperties, MapViewProps } from "@/types/map";
import { CountryCombobox } from "@/components/countryComboBox";
import { useActionState, useEffect } from "react";
import { addCountry } from "@/data/actions/countries";
import { toast } from "../ui/toast";

export default function MapView({ countries, highlightedCountryCodes }: MapViewProps) {
  const highlightedCountries = new Set(highlightedCountryCodes);
  console.log(highlightedCountries);

  const [state, action, isPending] = useActionState(addCountry, null);

  useEffect(() => {
    if (isPending) {
      toast.add({
        title: "Adding country...",
        type: "info",
      });
    } else if (state?.success) {
      toast.add({
        title: "Country added",
        type: "success",
      });
    } else if (state?.success === false) {
      toast.add({
        title: "Error adding country",
        description: state?.message,
        type: "error",
      });
    }
  }, [isPending, state]);

  function getCountryStyle(feature?: GeoJsonFeature<Geometry, CountryProperties>) {
    const countryCode = feature?.properties["ISO3166-1-Alpha-3"];

    return countryCode && highlightedCountries.has(countryCode) ? highlightedCountryStyle : countryStyle;
  }

  return (
    <div className="relative h-screen w-screen bg-background">
      <MapContainer center={[20, 0]} zoom={2} minZoom={1} maxZoom={8} className="themed-map h-full w-full z-0" scrollWheelZoom={true}>
        <GeoJSON data={countries} style={getCountryStyle} />
      </MapContainer>

      <div className="absolute bg-card border-t border-2 p-2 border-border bottom-0 w-screen flex z-10 flex-row items-center justify-center gap-2 text-foreground-secondary">
        <form action={action} className="flex flex-row gap-2">
          <CountryCombobox />
          <Button type="submit">Add to map</Button>
        </form>
      </div>
    </div>
  );
}
