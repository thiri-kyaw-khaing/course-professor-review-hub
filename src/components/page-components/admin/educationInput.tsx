import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function EducationInput() {
  const [inputValue, setInputValue] = useState("");
  const [educations, setEducations] = useState<string[]>([]);

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    setEducations([...educations, inputValue.trim()]);
    setInputValue("");
  };

  const handleRemove = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">Education</label>

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

      <div className="space-y-2">
        {educations.map((edu, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md"
          >
            <span>{edu}</span>
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
