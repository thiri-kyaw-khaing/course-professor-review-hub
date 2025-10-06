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

export default function CourseEditForm() {
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
              <FieldLabel htmlFor="courseCode">Course Code*</FieldLabel>
              <Input id="courseCode" type="text" placeholder="CS101" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="credits">Credits</FieldLabel>
              <Input id="credits" type="text" placeholder="3" />
            </Field>
          </div>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="courseName">Course Name*</FieldLabel>
              <Input
                id="courseName"
                type="text"
                placeholder="Introduction to Computer Science"
                required
              />
            </Field>
            {/* Department Dropdown */}
            <div className="w-full max-w-md">
              <Field>
                <FieldLabel>Department</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose department" />
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
                <FieldDescription>
                  Select your department or area of work.
                </FieldDescription>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <textarea
                id="description"
                placeholder="Enter course description"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#8B0000] focus:ring focus:ring-[#8B0000] focus:ring-opacity-50"
              />
            </Field>
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
            Save Course
          </Button>
        </div>
      </div>
    </div>
  );
}
