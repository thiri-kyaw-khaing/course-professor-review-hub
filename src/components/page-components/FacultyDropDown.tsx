"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { set } from "zod";

const names = [
  "all",
  "School_of_Cosmetic_Science",
  "School_of_Health_Science",
  "School_of_Applied_Digital_Technology",
  "School_of_Integrative_Medicine",
  "School_of_Law",
  "School_of_Liberal_Arts",
  "School_of_Management",
  "School_of_Nursing",
  "School_of_Science",
  "School_of_Sinology",
  "School_of_Social_Innovation",
  "School_of_Dentistry",
];

interface FacultyDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FacultyDropdown({
  value,
  onChange,
}: FacultyDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedName, setSelectedName] = React.useState<string>(
    value
      ? names.find((name) => name === value) || "Select Faculty"
      : "Select Faculty"
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
              {names.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`w-full px-4 py-2 text-left text-sm font-normal hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    open === true ? "bg-gray-200 dark:bg-gray-800" : ""
                  }`}
                  onClick={() => {
                    handleSelect(name);
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
