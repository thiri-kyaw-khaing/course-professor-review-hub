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
  return (
    <div className="">
      <div className="w-full max-w-md space-y-6">
        <FieldSet>
          {/* <FieldLegend>Address Information</FieldLegend>
          <FieldDescription>
            We need your address to deliver your order.
          </FieldDescription> */}
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="firstName">First Name*</FieldLabel>
              <Input id="firstName" type="text" placeholder="John" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last Name*</FieldLabel>
              <Input id="lastName" type="text" placeholder="Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email*</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                required
              />
            </Field>
            {/* Department Dropdown */}
            <div className="w-full max-w-md">
              <Field>
                <FieldLabel>Faculty</FieldLabel>
                <Select>
                  <SelectTrigger>
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
          </div>
          <FieldGroup>
            <Field>
              <EducationInput />
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
