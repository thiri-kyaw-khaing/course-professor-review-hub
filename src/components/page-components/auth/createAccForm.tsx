import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { Link } from "react-router";
import FacultyDropdown from "../FacultyDropDown";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSubmit } from "react-router-dom";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "./passwordInput";

const FormSchema = z.object({
  faculty: z.string().min(2, "Faculty is required"),
  password: z
    .string()
    .min(8, "password must be 8 digits")
    .max(8, "password must be 8 digits")
    .regex(/^\d+$/, "password must be numbers"),

  confirmPassword: z
    .string()
    .min(8, "password must be 8 digits")
    .max(8, "password must be 8 digits")
    .regex(/^\d+$/, "password must be numbers"),
});

export default function CreateAccForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null);
  const submit = useSubmit();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      faculty: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    // console.log(values);
    // setLoading(true);
    // Call api
    submit(values, { method: "POST", action: "/register/create" });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full pr-8 lg:pr-0"
          autoComplete="off"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  {siteConfig.logo && (
                    <img src={siteConfig.logo} alt="Logo" className="h-8 w-8" />
                  )}
                </div>
                <span className="sr-only">RateWise</span>
              </a>
              <h1 className="text-xl font-bold">Create Account</h1>
              <div className="text-center text-sm text-muted-foreground">
                {/* Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a> */}
                Register with your MFU email to join the course review community
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <PasswordInput
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  {...form.register("confirmPassword")}
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <Field className="w-full">
                  <FieldLabel>Faculty</FieldLabel>
                  <Controller
                    name="faculty"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
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
                          <SelectItem value="School_of_Law">
                            School of Law
                          </SelectItem>
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
                </Field>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}{" "}
              <Button type="submit" className="w-full bg-[#8B0000] text-white">
                Create Account
              </Button>
              <div>
                <p className="text-center text-sm  underline-offset-4 underline text-[#8B0000]">
                  Already have an account?{""} <Link to="/login">Log in</Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
