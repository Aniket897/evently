import { Skeleton } from "../ui/skeleton";

export default function EventCardFallback() {
  return (
    <div className="rounded-3xl border border-neutral-200 p-6 bg-gray-50 shadow-sm space-y-4">
      <Skeleton className="h-6 w-3/4 rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-2/3 rounded-md" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/3 rounded-md" />
        <Skeleton className="h-4 w-1/3 rounded-md" />
      </div>
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}
