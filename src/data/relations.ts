import { defineRelations } from "drizzle-orm";

import * as schema from "@/data/schema";

export const relations = defineRelations(schema, (relation) => ({
  usersTable: {
    userCountries: relation.many.userCountriesTable(),
    pins: relation.many.pinsTable(),
  },
  countriesTable: {
    userCountries: relation.many.userCountriesTable(),
    pins: relation.many.pinsTable(),
  },
  userCountriesTable: {
    user: relation.one.usersTable({
      from: relation.userCountriesTable.userId,
      to: relation.usersTable.id,
    }),
    country: relation.one.countriesTable({
      from: relation.userCountriesTable.countryIso3,
      to: relation.countriesTable.iso3,
    }),
  },
  sessionTable: {
    user: relation.one.usersTable({
      from: relation.sessionTable.userId,
      to: relation.usersTable.id,
    }),
  },
  pinsTable: {
    user: relation.one.usersTable({
      from: relation.pinsTable.userId,
      to: relation.usersTable.id,
    }),
    country: relation.one.countriesTable({
      from: relation.pinsTable.countryIso3,
      to: relation.countriesTable.iso3,
    }),
    photos: relation.many.pinPhotosTable(),
  },
  pinPhotosTable: {
    pin: relation.one.pinsTable({
      from: relation.pinPhotosTable.pinId,
      to: relation.pinsTable.id,
    }),
  },
}));
