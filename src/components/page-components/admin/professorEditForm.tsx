import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EducationInput from "./educationInput";
import type { Professor } from "@/types";
import { useState } from "react";
interface ProfessorEditFormProps {
  professor: Professor;
}
export default function ProfessorEditForm({
  professor,
}: ProfessorEditFormProps) {
  // Step 2: Set initial state from props
  const [formData, setFormData] = useState({
    name: professor.name || "",
    email: professor.email || "",
    faculty: professor.faculty || "",
    // Add other fields as necessary
    education: professor.education || [""],
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Step 3: handle changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      department: value,
    }));
  };
  // Step 4: handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated course:", formData);
    // TODO: call your API to update course
  };

  const handleEducationChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.education]; // copy old array
      updated[index] = value; // replace one value
      return { ...prev, education: updated };
    });
  };

  return (
    <div className="">
      <div className="w-full max-w-md space-y-6">
        <FieldSet>
          {/* <FieldLegend>Address Information</FieldLegend>
          <FieldDescription>
            We need your address to deliver your order.
          </FieldDescription> */}
          {/* Name full width */}
          <div className="grid grid-cols-1 mb-4">
            <Field className="w-full">
              <FieldLabel htmlFor="name">Name*</FieldLabel>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full"
              />
            </Field>
          </div>

          {/* Email + Faculty side by side */}
          <div className="grid grid-cols-2 gap-4">
            <Field className="w-full">
              <FieldLabel htmlFor="email">Email*</FieldLabel>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
                className="w-full"
              />
            </Field>

            <Field className="w-full">
              <FieldLabel>Faculty</FieldLabel>
              <Select
                value={formData.faculty}
                onValueChange={handleDepartmentChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose faculty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <FieldGroup>
            <Field>
              <EducationInput
                value={formData.education}
                onChange={(index, value) =>
                  setFormData((prev) => {
                    const updated = [...prev.education];
                    updated[index] = value;
                    return { ...prev, education: updated };
                  })
                }
                onAdd={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    education: [...prev.education, newValue],
                  }))
                }
                onRemove={(index) =>
                  setFormData((prev) => ({
                    ...prev,
                    education: prev.education.filter((_, i) => i !== index),
                  }))
                }
              />
            </Field>

            {/* 
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <textarea
                id="description"
                placeholder="Enter course description"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#8B0000] focus:ring focus:ring-[#8B0000] focus:ring-opacity-50"
              />
            </Field> */}
          </FieldGroup>
        </FieldSet>
        <div className="flex justify-end space-x-4">
          {/* <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </Button> */}
          <Button
            type="submit"
            className="px-4 py-2 bg-[#8B0000] text-white rounded hover:bg-red-700"
          >
            Add Professor
          </Button>
        </div>
      </div>
    </div>
  );
}
