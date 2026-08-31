import { Spinner } from "@/components/ui/spinner";

export default function MapLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
      <div className="flex items-center gap-2" role="status">
        <Spinner aria-hidden="true" />
        <span>Loading map...</span>
      </div>
    </div>
  );
}
