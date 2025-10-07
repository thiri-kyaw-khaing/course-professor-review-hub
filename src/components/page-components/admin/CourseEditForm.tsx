// import { Button } from "@/components/ui/button";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
//   FieldLegend,
//   FieldSet,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function CourseEditForm() {
//   return (
//     <div className="">
//       <div className="w-full max-w-md space-y-6">
//         <FieldSet>
//           {/* <FieldLegend>Address Information</FieldLegend>
//           <FieldDescription>
//             We need your address to deliver your order.
//           </FieldDescription> */}
//           <div className="grid grid-cols-2 gap-4">
//             <Field>
//               <FieldLabel htmlFor="courseCode">Course Code*</FieldLabel>
//               <Input id="courseCode" type="text" placeholder="CS101" required />
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="credits">Credits</FieldLabel>
//               <Input id="credits" type="text" placeholder="3" />
//             </Field>
//           </div>
//           <FieldGroup>
//             <Field>
//               <FieldLabel htmlFor="courseName">Course Name*</FieldLabel>
//               <Input
//                 id="courseName"
//                 type="text"
//                 placeholder="Introduction to Computer Science"
//                 required
//               />
//             </Field>
//             {/* Department Dropdown */}
//             <div className="w-full max-w-md">
//               <Field>
//                 <FieldLabel>Department</FieldLabel>
//                 <Select>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Choose department" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="engineering">Engineering</SelectItem>
//                     <SelectItem value="design">Design</SelectItem>
//                     <SelectItem value="marketing">Marketing</SelectItem>
//                     <SelectItem value="sales">Sales</SelectItem>
//                     <SelectItem value="support">Customer Support</SelectItem>
//                     <SelectItem value="hr">Human Resources</SelectItem>
//                     <SelectItem value="finance">Finance</SelectItem>
//                     <SelectItem value="operations">Operations</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FieldDescription>
//                   Select your department or area of work.
//                 </FieldDescription>
//               </Field>
//             </div>
//             <Field>
//               <FieldLabel htmlFor="description">Description</FieldLabel>
//               <textarea
//                 id="description"
//                 placeholder="Enter course description"
//                 required
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#8B0000] focus:ring focus:ring-[#8B0000] focus:ring-opacity-50"
//               />
//             </Field>
//           </FieldGroup>
//         </FieldSet>
//         <div className="flex justify-end space-x-4">
//           {/* <button
//             type="button"
//             className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
//           >
//             Cancel
//           </Button> */}
//           <Button
//             type="submit"
//             className="px-4 py-2 bg-[#8B0000] text-white rounded hover:bg-red-700"
//           >
//             Save Course
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
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
import type { Course } from "@/types";

interface CourseEditFormProps {
  course: Course;
}

export default function CourseEditForm({ course }: CourseEditFormProps) {
  // Step 2: Set initial state from props
  const [formData, setFormData] = useState({
    courseCode: course.code || "",
    courseName: course.name || "",
    credits: course.credits || "",
    department: course.faculty || "",
    description: course.description || "",
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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <FieldSet>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="courseCode">Course Code*</FieldLabel>
            <Input
              id="courseCode"
              type="text"
              value={formData.courseCode}
              onChange={handleChange}
              placeholder="CS101"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="credits">Credits</FieldLabel>
            <Input
              id="credits"
              type="text"
              value={formData.credits}
              onChange={handleChange}
              placeholder="3"
            />
          </Field>
        </div>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="courseName">Course Name*</FieldLabel>
            <Input
              id="courseName"
              type="text"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="Introduction to Computer Science"
              required
            />
          </Field>

          {/* Department Dropdown */}
          <Field>
            <FieldLabel>Department</FieldLabel>
            <Select
              value={formData.department}
              onValueChange={handleDepartmentChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="School_of_Agro_Industry">
                  School of Agro Industry
                </SelectItem>
                <SelectItem value="School_of_Cosmetic_Science">
                  School of Cosmetic Science
                </SelectItem>
                <SelectItem value="School_of_Health_Science">
                  School of Health Science
                </SelectItem>
                <SelectItem value="School_of_Applied_Digital_Technology">
                  School of Applied Digital Technology
                </SelectItem>
                <SelectItem value="School_of_Integrative_Medicine">
                  School of Integrative Medicine
                </SelectItem>
                <SelectItem value="School_of_Law">School of Law</SelectItem>
                <SelectItem value="School_of_Liberal_Arts">
                  School of Liberal Arts
                </SelectItem>
                <SelectItem value="School_of_Management">
                  School of Management
                </SelectItem>
                <SelectItem value="School_of_Nursing">
                  School of Nursing
                </SelectItem>
                <SelectItem value="School_of_Science">
                  School of Science
                </SelectItem>
                <SelectItem value="School_of_Sinology">
                  School of Sinology
                </SelectItem>
                <SelectItem value="School_of_Social_Innovation">
                  School of Social Innovation
                </SelectItem>
                <SelectItem value="School_of_Dentistry">
                  School of Dentistry
                </SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>
              Select your department or area of work.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#8B0000] focus:ring focus:ring-[#8B0000] focus:ring-opacity-50"
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex justify-end space-x-4">
        <Button
          className="border  bg-gray-300 text-black hover:bg-gray-100"
          onClick={() => setIsAddDialogOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="px-4 py-2 bg-[#8B0000] text-white rounded hover:bg-red-700"
        >
          Update Course
        </Button>
      </div>
    </form>
  );
}
