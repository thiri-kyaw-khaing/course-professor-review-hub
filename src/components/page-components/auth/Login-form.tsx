import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { Link } from "react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
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
                required
              />
            </div>
            <Link to="/register/otp">
              {" "}
              <Button type="submit" className="w-full bg-[#8B0000] text-white">
                Request OTP
              </Button>
            </Link>
            <div>
              <p className="text-center text-sm  underline-offset-4 underline text-[#8B0000]">
                Already have an account?{""} <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
