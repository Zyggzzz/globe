"use server";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { FeatureCollection, Geometry } from "geojson";
import type { CountryProperties } from "@/types/map";
import { db } from "..";

const countriesGeojson = readFile(join(process.cwd(), "src", "data", "countries.geojson"), "utf8").then(
  (contents) => JSON.parse(contents) as FeatureCollection<Geometry, CountryProperties>,
);

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
  return countriesGeojson;
}
