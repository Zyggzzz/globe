"use client";

import type { Feature as GeoJsonFeature, Geometry } from "geojson";
import type { Layer, LeafletMouseEvent } from "leaflet";
import { GeoJSON, MapContainer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { CountryCombobox } from "@/components/countryComboBox";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle } from "@/components/ui/popover";
import { toast } from "@/components/ui/toast";
import { addCountry, removeCountry } from "@/data/actions/countries";
import { countryStyle, highlightedCountryStyle } from "@/styles/map";
import type { CountryProperties, MapViewProps } from "@/types/map";
import { useActionState, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

interface SelectedCountry {
  alpha2Code: string;
  alpha3Code: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
}

interface MapInteractionHandlerProps {
  closeCountryPopover: () => void;
}

function MapInteractionHandler({ closeCountryPopover }: MapInteractionHandlerProps) {
  useMapEvents({
    movestart: closeCountryPopover,
    zoomstart: closeCountryPopover,
  });

  return null;
}

export default function MapView({ countries, highlightedCountryCodes }: MapViewProps) {
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry | null>(null);
  const [isCountryPopoverOpen, setIsCountryPopoverOpen] = useState(false);
  const [addCountryState, addCountryAction, isAddingCountry] = useActionState(addCountry, null);
  const [removeCountryState, removeCountryAction, isRemovingCountry] = useActionState(removeCountry, null);
  const highlightedCountries = useMemo(() => new Set(highlightedCountryCodes), [highlightedCountryCodes]);
  const highlightedCountriesRef = useRef(highlightedCountries);
  highlightedCountriesRef.current = highlightedCountries;
  const popoverAnchor = useMemo(() => {
    if (!selectedCountry) {
      return null;
    }

    const { x, y } = selectedCountry.position;

    return {
      getBoundingClientRect: () => new DOMRect(x, y),
    };
  }, [selectedCountry]);

  const closeCountryPopover = useCallback(() => {
    setIsCountryPopoverOpen(false);
  }, []);

  useEffect(() => {
    if (isAddingCountry) {
      toast.add({
        title: "Adding country...",
        type: "info",
      });
    } else if (addCountryState?.success) {
      toast.add({
        title: "Country added",
        type: "success",
      });
    } else if (addCountryState?.success === false) {
      toast.add({
        title: "Error adding country",
        description: addCountryState.message,
        type: "error",
      });
    }
  }, [addCountryState, isAddingCountry]);

  useEffect(() => {
    if (isRemovingCountry) {
      toast.add({
        title: "Removing country...",
        type: "info",
      });
    } else if (removeCountryState?.success) {
      closeCountryPopover();
      toast.add({
        title: "Country removed",
        type: "success",
      });
    } else if (removeCountryState?.success === false) {
      toast.add({
        title: "Error removing country",
        description: removeCountryState.message,
        type: "error",
      });
    }
  }, [closeCountryPopover, isRemovingCountry, removeCountryState]);

  function getCountryStyle(feature?: GeoJsonFeature<Geometry, CountryProperties>) {
    const countryCode = feature?.properties["ISO3166-1-Alpha-3"];

    return countryCode && highlightedCountries.has(countryCode) ? highlightedCountryStyle : countryStyle;
  }

  function addCountryClickHandler(feature: GeoJsonFeature<Geometry, CountryProperties>, layer: Layer) {
    const countryCode = feature.properties["ISO3166-1-Alpha-3"];

    layer.on("click", (event: LeafletMouseEvent) => {
      if (!highlightedCountriesRef.current.has(countryCode)) {
        return;
      }

      setSelectedCountry({
        alpha2Code: feature.properties["ISO3166-1-Alpha-2"],
        alpha3Code: countryCode,
        name: feature.properties.name,
        position: {
          x: event.originalEvent.clientX,
          y: event.originalEvent.clientY,
        },
      });
      setIsCountryPopoverOpen(true);
    });
  }

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-background">
      <MapContainer center={[20, 0]} zoom={2} minZoom={1} maxZoom={8} className="themed-map h-full w-full z-0" scrollWheelZoom={true}>
        <MapInteractionHandler closeCountryPopover={closeCountryPopover} />
        <GeoJSON data={countries} style={getCountryStyle} onEachFeature={addCountryClickHandler} />
      </MapContainer>

      <Popover
        open={isCountryPopoverOpen}
        onOpenChange={(open, eventDetails) => {
          const eventTarget = eventDetails.event.target;
          const isHighlightedCountryClick = eventTarget instanceof Element && eventTarget.closest(".highlighted-country") !== null;

          if (!open && eventDetails.reason === "outside-press" && isHighlightedCountryClick) {
            return;
          }

          setIsCountryPopoverOpen(open);
        }}
        onOpenChangeComplete={(open) => !open && setSelectedCountry(null)}
      >
        {selectedCountry && (
          <PopoverContent anchor={popoverAnchor} positionMethod="fixed" side="top" sideOffset={8} className="w-auto min-w-40 gap-2">
            <PopoverHeader className="flex flex-row items-center gap-2">
              <Image src={`https://flagsapi.com/${selectedCountry.alpha2Code}/flat/64.png`} alt={selectedCountry.name} width={32} height={24} />
              <div>
                {" "}
                <PopoverTitle>{selectedCountry.name}</PopoverTitle>
                <PopoverDescription>
                  {selectedCountry.alpha2Code} · {selectedCountry.alpha3Code}
                </PopoverDescription>
              </div>
            </PopoverHeader>
            <form action={removeCountryAction}>
              <input type="hidden" name="countryIso3" value={selectedCountry.alpha3Code} />
              <Button type="submit" variant="destructive" className="w-full" disabled={isRemovingCountry}>
                {isRemovingCountry ? "Removing..." : "Remove country"}
              </Button>
            </form>
          </PopoverContent>
        )}
      </Popover>

      <div className="absolute bottom-0 z-10 flex w-full flex-row items-center justify-center gap-2 border-t border-border bg-card px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-foreground-secondary sm:px-2 sm:pt-2 sm:pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <form action={addCountryAction} className="flex flex-col w-full justify-center sm:flex-row gap-2">
          <CountryCombobox />
          <Button type="submit">Add to map</Button>
        </form>
      </div>
    </div>
  );
}
