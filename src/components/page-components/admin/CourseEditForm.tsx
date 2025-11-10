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
import { set, z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCoursesStore } from "@/store/courseStore";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form"; // ✅ Correct import
import api from "@/api";
import { toast } from "sonner";

import { useState } from "react";
const schema = z.object({
  courseCode: z
    .string()
    .min(2, "Course code is required")
    .max(7, "Max 7 chars"),
  courseName: z.string().min(2, "Course name is required"),
  credits: z.coerce.number().min(1).max(4, "Max 4 credits"), // ✅ coerce handles string inputs
  faculty: z.string().min(2, "Faculty is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

interface CourseEditFormProps {
  course: Course;
  onClose?: () => void;
}

export default function CourseEditForm({
  course,
  onClose,
}: CourseEditFormProps) {
  const queryClient = useQueryClient();
  const { updateCourse } = useCoursesStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      courseCode: course.code ?? "",
      courseName: (course.title as string) ?? "",
      credits: Number(course.credits ?? 3),
      faculty: course.faculty ?? "",
      description: course.description ?? "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setErrorMessage(null);
    try {
      const response = await api.patch("/admins/courses", {
        courseId: course.id,
        code: values.courseCode,
        title: values.courseName,
        credits: values.credits,
        faculty: values.faculty,
        description: values.description,
      });
      console.log("Update response:", response);

      if (response.status === 200) {
        updateCourse(course.id, response.data);
        await queryClient.invalidateQueries({ queryKey: ["courses"] });
        toast.success("✅ Course updated successfully!");
        if (onClose) onClose();
      }
    } catch (error) {
      // ✅ Extract message safely
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "An error occurred while updating the course.";
      setErrorMessage(message);
      console.log("Error updating course:", message);
      // ✅ Show toast (works reliably)

      toast.error(`❌ Failed to update course: ${message}`);
    }
  };

  return (
    <Form {...form}>
      {/* ✅ Only one <form> element here */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6"
      >
        <FieldSet>
          <div className="grid grid-cols-2 gap-4">
            {/* Course Code */}
            <Field>
              <FieldLabel htmlFor="courseCode">Course Code*</FieldLabel>
              <Input
                id="courseCode"
                placeholder="CS101"
                {...form.register("courseCode")}
              />
            </Field>

            {/* Credits */}
            <Field>
              <FieldLabel htmlFor="credits">Credits</FieldLabel>
              <Input
                id="credits"
                type="number"
                placeholder="3"
                {...form.register("credits", { valueAsNumber: true })}
              />
            </Field>
          </div>

          <FieldGroup>
            {/* Course Name */}
            <Field>
              <FieldLabel htmlFor="courseName">Course Name*</FieldLabel>
              <Input
                id="courseName"
                placeholder="Introduction to Computer Science"
                {...form.register("courseName")}
              />
              {}
            </Field>

            {/* Department Dropdown */}
            <Field>
              <FieldLabel>Department</FieldLabel>
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
              <FieldDescription>
                Select your department or area of work.
              </FieldDescription>
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <textarea
                id="description"
                {...form.register("description")}
                placeholder="Enter course description"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#8B0000] focus:ring focus:ring-[#8B0000] focus:ring-opacity-50"
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        {errorMessage && (
          <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            className="border bg-gray-300 text-black hover:bg-gray-100"
            onClick={onClose}
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
    </Form>
  );
}
