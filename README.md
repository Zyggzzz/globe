# Globe

Globe is an interactive travel tracker that turns the countries you have visited into a personal world map. Search for a country, add it to your account, and it will be highlighted on the map so you can see your travels at a glance.

> [!NOTE]
> Globe is still under active development. The current version focuses on account management and country-level travel tracking, with more detailed ways to document trips planned for future releases.

## Features

- Interactive world map built with Leaflet and GeoJSON
- Searchable country selection
- Personal collection of visited countries
- Country details with flags and ISO codes
- Custom account authentication and persistent sessions
- Light and dark themes
- Responsive interface for desktop and mobile devices

## Tech stack

- [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Leaflet](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/)
- [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com/) and [Base UI](https://base-ui.com/)
- [Bun](https://bun.sh/)

## Getting started

### Prerequisites

- Bun
- A PostgreSQL database

### Installation

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/Zyggzzz/globe.git
   cd globe
   ```

2. Install the dependencies:

   ```bash
   bun install
   ```

3. Create a `.env` file and add your PostgreSQL connection string:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/globe
   ```

4. Apply the database schema and seed the country data:

   ```bash
   bunx drizzle-kit push
   bun run db:seed:countries
   ```

5. Start the development server:

   ```bash
   bun run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Roadmap

- [ ] Add pins for specific cities, landmarks, and other visited locations
- [ ] Attach photos and videos to trips and location pins
- [ ] Add travel dates, notes, and memories
- [ ] Group visited locations into individual trips
- [ ] Show personal travel statistics and map progress
- [ ] Expand profile and account settings

## Project status

Globe is a work in progress, so its features and interface may change as development continues.
