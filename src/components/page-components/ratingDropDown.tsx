"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ratings = ["All Ratings", "5 Stars", "4+ Stars", "3+ Stars"];
interface RatingDropdownProps {
  value?: string;
  onChange: (value: string) => void;
}
export default function RatingDropdown({
  value,
  onChange,
}: RatingDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedName, setSelectedName] = React.useState<string>(
    value ? ratings.find((r) => r === value) || "All Ratings" : "All Ratings"
  );

  const handleSelect = (name: string) => {
    setSelectedName(name);
    setOpen(false);
    onChange(name);
  };
  return (
    <div className="flex flex-col gap-3 w-full ">
      <div className="">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="w-full">
            <Button
              variant="outline"
              id="category"
              className="w-full justify-between font-normal bg-gray-200"
            >
              {selectedName ?? "Select"}
              <ChevronDownIcon
                className={`transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <div className="flex flex-col">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className={`w-full px-4 py-2 text-left text-sm font-normal hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    open === true ? "bg-gray-200 dark:bg-gray-800" : ""
                  }`}
                  onClick={() => handleSelect(rating)}
                >
                  {rating}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
