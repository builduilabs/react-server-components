import { Spinner } from "./components/spinner";

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center bg-gray-50">
      <Spinner className="w-8 animate-spin" />
    </div>
  );
}
