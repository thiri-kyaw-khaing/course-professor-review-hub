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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useSubmit } from "react-router";
import api from "@/api";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCoursesStore } from "@/store/courseStore";

interface CourseFormProps {
  onClose?: () => void;
}

const courseSchema = z.object({
  courseCode: z
    .string()
    .min(2, "Course code is required")
    .max(7, "Course code must be 7 digits"), // Use string for text input
  courseName: z.string().min(2, "Course name is required"),
  credits: z.number("Credits must be a number").min(1).max(4),
  faculty: z.string().min(2, "Faculty is required"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .optional(),
});
export default function CourseForm({ onClose }: CourseFormProps) {
  const queryClient = useQueryClient();
  const { addCourse } = useCoursesStore();
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseCode: "",
      courseName: "",
      credits: 0,
      faculty: "",
      description: "",
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = form;

  async function onSubmit(values: z.infer<typeof courseSchema>) {
    try {
      // Convert form values to match backend format
      const payload = {
        title: values.courseName, // backend expects "title"
        code: values.courseCode, // backend expects "code"
        credits: values.credits.toString(), // ensure string if needed
        description: values.description,
        faculty: values.faculty,
      };

      const res = await api.post("/admins/courses", payload);

      if (res.data.success) {
        toast.success(res.data.message || "✅ Course added successfully!");
        console.log("Server response:", res.data);

        // ✅ Update UI instantly (optional)
        if (res.data.course) addCourse(res.data.course);

        // ✅ Invalidate the cached query → triggers automatic refetch
        await queryClient.invalidateQueries({ queryKey: ["courses"] });
        // Optionally reset form
        reset();
        onClose?.();
        // Optionally close dialog if applicable
      } else {
        toast.error(res.data.message || "Failed to add course.");
        console.error("Server returned:", res.data);
      }
    } catch (error: any) {
      console.error("Error submitting course:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while adding the course."
      );
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-6"
    >
      <FieldSet>
        <div className="grid grid-cols-2 gap-4">
          {/* Course Code */}
          <Field>
            <FieldLabel htmlFor="courseCode">Course Code*</FieldLabel>
            <Input
              id="courseCode"
              type="text"
              placeholder="1111222"
              {...register("courseCode")}
            />
            {errors.courseCode && (
              <p className="text-sm text-red-600 mt-1">
                {errors.courseCode.message}
              </p>
            )}
          </Field>

          {/* Credits */}
          <Field>
            <FieldLabel htmlFor="credits">Credits*</FieldLabel>
            <Input
              id="credits"
              type="number"
              placeholder="3"
              {...register("credits", { valueAsNumber: true })}
            />
            {errors.credits && (
              <p className="text-sm text-red-600 mt-1">
                {errors.credits.message}
              </p>
            )}
          </Field>
        </div>

        <FieldGroup>
          {/* Course Name */}
          <Field>
            <FieldLabel htmlFor="courseName">Course Name*</FieldLabel>
            <Input
              id="courseName"
              type="text"
              placeholder="Introduction to Computer Science"
              {...register("courseName")}
            />
            {errors.courseName && (
              <p className="text-sm text-red-600 mt-1">
                {errors.courseName.message}
              </p>
            )}
          </Field>

          {/* Faculty Select */}
          <Field>
            <FieldLabel htmlFor="faculty">Faculty*</FieldLabel>
            <Controller
              control={control}
              name="faculty"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
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
              )}
            />
            {errors.faculty && (
              <p className="text-sm text-red-600 mt-1">
                {errors.faculty.message}
              </p>
            )}
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="description">Description*</FieldLabel>
            <textarea
              id="description"
              placeholder="Enter course description"
              {...register("description")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#8B0000] focus:ring focus:ring-[#8B0000] focus:ring-opacity-50"
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="px-4 py-2 bg-[#8B0000] text-white rounded hover:bg-red-700"
        >
          Save Course
        </Button>
      </div>
    </form>
  );
}
