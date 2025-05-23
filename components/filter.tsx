import { ArrowRight, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface FilterProps {
  onchange: (filterString: string) => void;
}

export default function Filter({ onchange }: FilterProps) {
  return (
    <div className="flex items-center justify-between border-b pb-8">
      <div>
        <h1 className="underline underline-offset-8 font-bold text-2xl">
          All Events
        </h1>
      </div>
      <div className="flex items-center gap-2 relative">
        <Input
          placeholder="search here"
          onChange={(e) => onchange(e.target.value)}
          className="w-[300px] max-w-[90vw] rounded-3xl pl-[35px]"
        />
        <Search size={20} className="absolute top-[7px] left-[10px] text-neutral-600" />
      </div>
    </div>
  );
}
