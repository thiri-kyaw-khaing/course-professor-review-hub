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
// import EducationInput from "./educationInput";

// export default function ProfessorForm() {
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
//               <FieldLabel htmlFor="firstName">First Name*</FieldLabel>
//               <Input id="firstName" type="text" placeholder="John" required />
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="lastName">Last Name*</FieldLabel>
//               <Input id="lastName" type="text" placeholder="Doe" required />
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="email">Email*</FieldLabel>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="john.doe@example.com"
//                 required
//               />
//             </Field>
//             {/* Department Dropdown */}
//             <div className="w-full max-w-md">
//               <Field>
//                 <FieldLabel>Faculty</FieldLabel>
//                 <Select>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Choose faculty" />
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
//               </Field>
//             </div>
//           </div>
//           <FieldGroup>
//             <Field>
//               <EducationInput value={[]} onChange={() => {}} />
//             </Field>
//             {/*
//             <Field>
//               <FieldLabel htmlFor="description">Description</FieldLabel>
//               <textarea
//                 id="description"
//                 placeholder="Enter course description"
//                 required
//                 className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#8B0000] focus:ring focus:ring-[#8B0000] focus:ring-opacity-50"
//               />
//             </Field> */}
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
//             Add Professor
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EducationInput from "./educationInput";

export default function ProfessorForm() {
  // ✅ Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    faculty: "",
    education: [] as string[],
  });

  // ✅ Education handlers
  const handleEducationChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.education];
      updated[index] = value;
      return { ...prev, education: updated };
    });
  };

  const handleAddEducation = (newValue: string) => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, newValue],
    }));
  };

  const handleRemoveEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Professor:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <FieldSet>
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="firstName">First Name*</FieldLabel>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="John"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastName">Last Name*</FieldLabel>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Doe"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email*</FieldLabel>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="john.doe@example.com"
              required
            />
          </Field>

          {/* Faculty Dropdown */}
          <Field className="w-full">
            <FieldLabel>Faculty</FieldLabel>
            <Select
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, faculty: val }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose faculty" />
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
          </Field>
        </div>

        {/* ✅ EducationInput section */}
        <FieldGroup>
          <Field>
            <EducationInput
              value={formData.education}
              onChange={handleEducationChange}
              onAdd={handleAddEducation}
              onRemove={handleRemoveEducation}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="px-4 py-2 bg-[#8B0000] text-white rounded hover:bg-red-700"
        >
          Add Professor
        </Button>
      </div>
    </form>
  );
}
