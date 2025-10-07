import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface EducationInputProps {
  value: string[]; // comes from parent
  onChange: (index: number, value: string) => void; // updates parent state
  onAdd?: (newValue: string) => void; // optional callback to add new education
  onRemove?: (index: number) => void; // optional callback to remove education
}

export default function EducationInput({
  value,
  onChange,
  onAdd,
  onRemove,
}: EducationInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    if (onAdd) {
      onAdd(inputValue.trim());
    }
    setInputValue("");
  };

  const handleRemove = (index: number) => {
    if (onRemove) {
      onRemove(index);
    }
  };

  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">Education</label>

      {/* Add Input */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Ph.D. Computer Science - MIT"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-gray-50"
        />
        <Button
          type="button"
          onClick={handleAdd}
          className="bg-[#8B0000] text-white hover:bg-red-700"
        >
          Add
        </Button>
      </div>

      {/* Display Added Educations */}
      <div className="space-y-2">
        {value.map((edu, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md"
          >
            <Input
              value={edu}
              onChange={(e) => onChange(index, e.target.value)}
              className="bg-transparent border-none shadow-none focus-visible:ring-0"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-gray-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
