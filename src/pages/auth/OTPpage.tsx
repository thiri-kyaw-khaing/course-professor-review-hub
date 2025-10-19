import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useSubmit } from "react-router-dom";
import z from "zod";
const otpFormSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});
export default function OTPPage() {
  const submit = useSubmit();
  const form = useForm({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof otpFormSchema>) {
    console.log("OTP form submitted:", values);
    // Send to /login action via React Router
    // console.log("Login form submitted:", values);
    submit(values, { method: "POST", action: "/register/otp" });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <h1>Verification Code</h1>
        <p className="text-center text-sm text-muted-foreground">
          Please enter the verification code sent to your email.
        </p>
        <InputOTP
          maxLength={6}
          value={form.watch("otp")}
          onChange={(value) => form.setValue("otp", value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {form.formState.errors.otp && (
          <p className="text-sm text-destructive">
            {form.formState.errors.otp.message}
          </p>
        )}

        <Button type="submit" className="w-full bg-[#8B0000] text-white">
          Verify
        </Button>
      </div>
    </form>
  );
}
