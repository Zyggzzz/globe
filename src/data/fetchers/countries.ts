"use server";

import type { FeatureCollection, Geometry } from "geojson";
import { CountryProperties } from "@/types/map";
import { countriesApi } from "@/lib/countriesApi";
import { db } from "..";

export async function getHighlightedCountryCodes(userId: string) {
  const data = await db.query.userCountriesTable.findMany({
    where: {
      userId,
    },
    columns: {
      countryIso3: true,
    },
  });

  return data.map((country) => country.countryIso3);
}

export async function getCountriesGeojson() {
  const response = await countriesApi.get<FeatureCollection<Geometry, CountryProperties>>("/countries.geojson");

  return response.data;
}
