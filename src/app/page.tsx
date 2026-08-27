import MapLoader from "@/components/map/map-loader";
import { getCountriesGeojson } from "@/lib/countries-api";

const highlightedCountryCodes = ["IDN", "USA"];

export default async function Home() {
  const countries = await getCountriesGeojson();

  return <MapLoader countries={countries} highlightedCountryCodes={highlightedCountryCodes} />;
}
