import "dotenv/config";

import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import countries from "@/data/countries.json";
import { countriesTable } from "@/data/schema";

interface CountrySeed {
  name: string;
  alpha3: string;
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed countries.");
}

const isCountrySeed = (country: unknown): country is CountrySeed => {
  if (!country || typeof country !== "object") {
    return false;
  }

  const candidate = country as Record<string, unknown>;

  return (
    typeof candidate.name === "string" &&
    typeof candidate.alpha3 === "string" &&
    candidate.alpha3.length === 3
  );
};

const countrySeeds = countries.map((country) => {
  if (!isCountrySeed(country)) {
    throw new Error(`Invalid country seed: ${JSON.stringify(country)}`);
  }

  return {
    iso3: country.alpha3.toUpperCase(),
    name: country.name,
  };
});

const pool = new Pool({ connectionString: databaseUrl });
const db = drizzle({ client: pool });

const seedCountries = async () => {
  try {
    await db
      .insert(countriesTable)
      .values(countrySeeds)
      .onConflictDoUpdate({
        target: countriesTable.iso3,
        set: {
          name: sql`excluded.name`,
        },
      });

    console.log(`Seeded ${countrySeeds.length} countries.`);
  } finally {
    await pool.end();
  }
};

seedCountries().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
