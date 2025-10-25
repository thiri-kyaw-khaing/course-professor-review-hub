import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { Link, useSubmit } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useActionData, useNavigation } from "react-router";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .refine(
      (email) => email.endsWith("@lamduan.mfu.ac.th"),
      "Email must end with @lamduan.mfu.ac.th"
    ),
});
export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Send to /login action via React Router
    console.log("Login form submitted:", values);
    submit(values, { method: "POST", action: "." });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center min-h-screen"
        >
          <div className="flex flex-col gap-6 border border-gray-200 rounded-lg p-8 md:p-10 bg-background max-w-md w-full mx-auto">
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
                <Label htmlFor="email">MFU Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@mfu.lamduan.ac.th"
                  required
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>{" "}
              <Button type="submit" className="w-full bg-[#8B0000] text-white">
                {isSubmitting ? "Sending OTP..." : "Send OTP"}
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
