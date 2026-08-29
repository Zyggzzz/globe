import MapLoader from "@/components/map/map-loader";
import { getCountriesGeojson, getHighlightedCountryCodes } from "@/data/fetchers/countries";

export default async function Home() {
  const countries = await getCountriesGeojson();
  const highlightedCountryCodes = await getHighlightedCountryCodes();

  return <MapLoader countries={countries} highlightedCountryCodes={highlightedCountryCodes} />;
}
