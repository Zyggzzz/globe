import MapLoader from "@/components/map/map-loader";
import { getCountriesGeojson, getHighlightedCountryCodes } from "@/data/fetchers/countries";
import { protectPage } from "@/lib/protectPage";

export default async function Home() {
  const { user } = await protectPage();

  const countries = await getCountriesGeojson();
  const highlightedCountryCodes = await getHighlightedCountryCodes(user.id);

  return <MapLoader countries={countries} highlightedCountryCodes={highlightedCountryCodes} />;
}
