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
import type { Professor } from "@/types";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useProfessorsStore } from "@/store/professorStore";
import api from "@/api";
import { toast } from "sonner";
import { useState } from "react";

// ✅ Zod schema that can handle either string[] or object[]
const professorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format"),
  faculty: z.string().min(2, "Faculty is required"),
  education: z
    .array(
      z.union([
        z.string(),
        z.object({
          id: z.number().optional(),
          degree: z.string(),
        }),
      ])
    )
    .optional()
    .default([]),
});

type FormValues = z.infer<typeof professorSchema>;

interface ProfessorEditFormProps {
  professor: Professor;
  onClose?: () => void;
}

export default function ProfessorEditForm({
  professor,
  onClose,
}: ProfessorEditFormProps) {
  console.log("✅ ProfessorEditForm rendered for", professor.name);

  const queryClient = useQueryClient();
  const { updateProfessor } = useProfessorsStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ✅ Normalize professor.education into string[]
  const normalizedEducation = Array.isArray(professor.education)
    ? professor.education.map((edu: any) =>
        typeof edu === "string" ? edu : edu.degree
      )
    : [];

  const form = useForm<FormValues>({
    resolver: zodResolver(professorSchema),
    defaultValues: {
      name: professor.name || "",
      email: professor.email || "",
      faculty: professor.faculty || "",
      education: normalizedEducation,
    },
  });

  const { register, control, formState } = form;
  const { errors } = formState;

  const [submitting, setSubmitting] = useState(false);

  // ✅ Submit handler
  const onSubmit = async (values: FormValues) => {
    const sanitizedEducation = (values.education || []).map((edu) =>
      typeof edu === "string" ? edu : edu.degree
    );

    console.log("🔥 onSubmit triggered with:", {
      ...values,
      education: sanitizedEducation,
    });

    try {
      setErrorMessage(null);
      setSubmitting(true);
      const response = await api.patch("/admins/professors", {
        professorId: professor.id,
        name: values.name,
        email: values.email,
        faculty: values.faculty,
        education: sanitizedEducation,
      });

      console.log("✅ Update response:", response);

      if (response.status === 200) {
        updateProfessor(professor.id, response.data);
        await queryClient.invalidateQueries({ queryKey: ["professors"] });
        toast.success("✅ Professor updated successfully!");
        if (onClose) onClose();
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "An error occurred while updating the course.";
      setErrorMessage(message);
      console.error("❌ Error updating professor:", error);
      toast.error("Failed to update professor. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-6"
    >
      <FieldSet>
        {/* ✅ Name field */}
        <div className="grid grid-cols-1 mb-4">
          <Field className="w-full">
            <FieldLabel htmlFor="name">Name*</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              className="w-full"
              {...register("name")}
            />
          </Field>
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* ✅ Email + Faculty side by side */}
        <div className="grid grid-cols-2 gap-4">
          <Field className="w-full">
            <FieldLabel htmlFor="email">Email*</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@mfu.ac.th"
              required
              className="w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </Field>

          <Field className="w-full">
            <FieldLabel>Faculty*</FieldLabel>
            <Controller
              name="faculty"
              control={control}
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

        {/* ✅ Education dynamic list */}
        <FieldGroup>
          <Field>
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
                {errors.education.message as string}
              </p>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
      {/* ✅ Submit button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-[#8B0000] text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update Professor"}
        </Button>
      </div>
    </form>
  );
}
