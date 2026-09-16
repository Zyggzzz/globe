import { Spinner } from "@/components/ui/spinner";

export default function MapLoading() {
  return (
    <div className="flex h-dvh w-full items-center justify-center overflow-hidden bg-background text-foreground">
      <div className="flex items-center gap-2" role="status">
        <Spinner aria-hidden="true" />
        <span>Loading map...</span>
      </div>
    </div>
  );
}
