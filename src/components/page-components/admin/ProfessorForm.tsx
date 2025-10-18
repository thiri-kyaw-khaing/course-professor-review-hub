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
import z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useProfessorsStore } from "@/store/professorStore";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/api";
import { toast } from "sonner";
interface ProfessorFormProps {
  onClose?: () => void;
}

const professorSchema = z.object({
  // Use string for text input
  name: z.string().min(2, "Name is required"),
  email: z
    .string()
    .email()
    .endsWith("@lamduan.mfu.ac.th", "Must be a valid university email"),
  faculty: z.string().min(2, "Faculty is required"),
  education: z.array(z.string()),
});

export default function ProfessorForm({ onClose }: ProfessorFormProps) {
  const queryClient = useQueryClient();
  const { addProfessor } = useProfessorsStore();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof professorSchema>>({
    resolver: zodResolver(professorSchema),
    defaultValues: {
      name: "",
      email: "",
      faculty: "",
      education: [],
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = form;

  // // ✅ Form state
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   faculty: "",
  //   education: [] as string[],
  // });
  async function onSubmit(values: z.infer<typeof professorSchema>) {
    try {
      // Convert form values to match backend format
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("faculty", values.faculty);

      // Convert array to comma-separated string (matches Postman)
      formData.append("education", values.education.join(","));

      // Append image if selected
      if (selectedImage) formData.append("image", selectedImage);
      for (const pair of formData.entries()) {
        console.log("🧩", pair[0], "=>", pair[1]);
      }
      const res = await api.post("/admins/professors", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(res.data.message || "✅ Professor added successfully!");
        console.log("Server response:", res.data);

        // ✅ Update UI instantly (optional)
        if (res.data.professor) addProfessor(res.data.professor);

        // ✅ Invalidate the cached query → triggers automatic refetch
        await queryClient.invalidateQueries({ queryKey: ["professors"] });
        // Optionally reset form
        reset();
        onClose?.();
        // Optionally close dialog if applicable
      } else {
        toast.error(res.data.message || "Failed to add professor.");
        console.error("Server returned:", res.data);
      }
    } catch (error: any) {
      console.error("Error submitting professor:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while adding the professor."
      );
    }
  }

  // ✅ Education handlers
  // const handleEducationChange = (index: number, value: string) => {
  //   setFormData((prev) => {
  //     const updated = [...prev.education];
  //     updated[index] = value;
  //     return { ...prev, education: updated };
  //   });
  // };

  // const handleAddEducation = (newValue: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     education: [...prev.education, newValue],
  //   }));
  // };

  // const handleRemoveEducation = (index: number) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     education: prev.education.filter((_, i) => i !== index),
  //   }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Submitted Professor:", formData);
  // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-6"
    >
      <FieldSet>
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="name">Name*</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="John"
              required
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="image">Profile Image</FieldLabel>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setSelectedImage(file || null);
              }}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email*</FieldLabel>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john.doe@example.com"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </Field>

          {/* Faculty Dropdown */}
          <Field className="w-full">
            <FieldLabel>Faculty</FieldLabel>
            <Controller
              name="faculty"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="School_of_Agro_Industry">
                      School of Agro Industry
                    </SelectItem>
                    <SelectItem value="School_of_Applied_Digital_Technology">
                      School of Applied Digital Technology
                    </SelectItem>
                    <SelectItem value="School_of_Management">
                      School of Management
                    </SelectItem>
                    <SelectItem value="School_of_Science">
                      School of Science
                    </SelectItem>
                    <SelectItem value="School_of_Social_Innovation">
                      School of Social Innovation
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.faculty && (
              <p className="text-sm text-red-600 mt-1">
                {errors.faculty.message}
              </p>
            )}
          </Field>
        </div>

        {/* ✅ EducationInput section */}
        <Controller
          name="education"
          control={control}
          render={({ field }) => (
            <EducationInput
              value={field.value || []}
              onChange={(index, val) => {
                const updated = [...(field.value || [])];
                updated[index] = val;
                field.onChange(updated);
              }}
              onAdd={(val) => field.onChange([...(field.value || []), val])}
              onRemove={(index) => {
                const updated = [...(field.value || [])];
                updated.splice(index, 1);
                field.onChange(updated);
              }}
            />
          )}
        />
        {errors.education && (
          <p className="text-sm text-red-600 mt-1">
            {errors.education.message}
          </p>
        )}
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
