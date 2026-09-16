import MapLoader from "@/components/map/map-loader";
import MapLoading from "@/components/map/map-loading";
import ProfileSettings from "@/components/profileSettings";
import ThemeSwitcher from "@/components/themeSwitcher";
import { getCountriesGeojson, getHighlightedCountryCodes } from "@/data/fetchers/countries";
import { protectPage } from "@/lib/protectPage";
import { Suspense } from "react";

interface MapContentProps {
  userId: string;
}

async function MapContent({ userId }: MapContentProps) {
  const [countries, highlightedCountryCodes] = await Promise.all([getCountriesGeojson(), getHighlightedCountryCodes(userId)]);

  return <MapLoader countries={countries} highlightedCountryCodes={highlightedCountryCodes} />;
}

export default async function Home() {
  const { user } = await protectPage();

  return (
    <div>
      <Suspense fallback={<MapLoading />}>
        <MapContent userId={user.id} />
      </Suspense>
      <div className="absolute top-4 right-4 flex flex-row gap-2">
        <ThemeSwitcher />
        <ProfileSettings user={user} />
      </div>
    </div>
  );
}
