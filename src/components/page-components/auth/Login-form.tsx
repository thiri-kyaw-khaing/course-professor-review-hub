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
import { useNavigation, useActionData, useSubmit } from "react-router-dom";

//
// ✅ Zod schema
//
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
    .min(8, "Password must be 8 digits")
    .max(8, "Password must be 8 digits")
    .regex(/^\d+$/, "Password must be numbers"),
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

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };

  // console.log("Action Data:", actionData);

  const submit = useSubmit();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Send to /login action via React Router
    // console.log("Login form submitted:", values);
    submit(values, { method: "POST", action: "/login" });
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen px-4",
        className
      )}
      {...props}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full max-w-sm text-center border border-gray-200 rounded-lg p-6 bg-background shadow-sm"
          autoComplete="off"
          noValidate
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-12 items-center justify-center rounded-full overflow-hidden">
                <img
                  src={siteConfig.logo}
                  alt="Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <span className="sr-only">RateWise</span>
            </a>

            {/* Header */}
            <h1 className="text-2xl font-bold text-black">Welcome Back</h1>
            <p className="text-sm text-gray-500 max-w-xs">
              Register with your MFU email to join the course review community
            </p>
          </div>
          {/* Inputs */}
          <div className="flex flex-col gap-4 text-left">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="font-semibold text-black">
                MFU Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="student@lamduan.mfu.ac.th"
                className="bg-white border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="font-semibold text-black">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="bg-white border-gray-300 focus:border-[#8B0000] focus:ring-[#8B0000]"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>
          {/* Server-side error */}
          {actionData && (
            <p className="text-xs text-start text-red-500">
              {actionData?.message}
            </p>
          )}
          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-[#8B0000] hover:bg-red-800 text-white py-2 rounded-md"
          >
            {isSubmitting ? "Submitting..." : "Log In"}
          </Button>
          {/* Signup link */}
          <p className="text-sm text-[#8B0000] underline underline-offset-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="hover:text-red-800">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
