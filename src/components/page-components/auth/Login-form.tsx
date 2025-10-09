import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useNavigation } from "react-router-dom";
import { useActionData } from "react-router-dom";
// import { useState } from "react";
const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .refine(
      (email) => email.endsWith("@lamduan.mfu.ac.th"),
      "Email must end with @lamduan.mfu.ac.th"
    ),
  password: z
    .string()
    .min(6, "password must be 6 digits")
    .max(6, "password must be 6 digits")
    .regex(/^\d+$/, "password must be numbers"),
});
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //to show loading/submitting
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  //for error message
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };
  //to submit form using action
  // const submit = useSubmit();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    // setLoading(true);
    // Call api
    // submit(values, { method: "POST", action: "/login" });
    console.log("✅ Form submitted with:", values);
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
              <h1 className="text-xl font-bold">Welcome Back</h1>
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
                <Label htmlFor="email">MFU Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@mfu.lamduan.ac.th"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.email.message}
                  </p>
                )}
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              {actionData?.error && (
                <p className="text-center text-sm text-red-600">
                  {actionData.error}
                </p>
              )}{" "}
              <Button type="submit" className="w-full bg-[#8B0000] text-white">
                {isSubmitting ? "Submitting..." : "Log In"}
              </Button>
              <div>
                <p className="text-center text-sm  underline-offset-4 underline text-[#8B0000]">
                  Don't have an account?{""} <Link to="/register">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
