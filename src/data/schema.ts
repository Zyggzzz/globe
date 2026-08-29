import { sql } from "drizzle-orm";
import { integer, pgTable, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const countriesTable = pgTable("countries", {
  iso3: varchar("iso3", { length: 3 }).primaryKey(),
  name: varchar("name").notNull(),
});

export const userCountriesTable = pgTable(
  "user_countries",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),

    countryIso3: varchar("country_iso3", { length: 3 })
      .notNull()
      .references(() => countriesTable.iso3, { onDelete: "restrict" }),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.countryIso3] }),
  }),
);

export const sessionTable = pgTable("session", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  tokenHash: varchar("token_hash", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true })
    .notNull()
    .default(sql`now() + interval '24 hours'`),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const pinsTable = pgTable("pins", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  countryIso3: varchar("country_iso3", { length: 3 })
    .notNull()
    .references(() => countriesTable.iso3, { onDelete: "restrict" }),

  title: varchar("title").notNull(),
  description: varchar("description"),

  latitude: varchar("latitude"),
  longitude: varchar("longitude"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const pinPhotosTable = pgTable("pin_photos", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  pinId: integer("pin_id")
    .notNull()
    .references(() => pinsTable.id, { onDelete: "cascade" }),

  photoUrl: varchar("photo_url").notNull(),
  caption: varchar("caption"),

  sortOrder: integer("sort_order").notNull().default(0),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});
