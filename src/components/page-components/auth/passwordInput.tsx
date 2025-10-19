import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeClosed, EyeClosedIcon, EyeOffIcon, LucideEye } from "lucide-react";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  const [showPass, setshowPass] = React.useState(false);
  return (
    <div className="relative">
      <Input
        type={showPass ? "text" : "password"}
        className={cn(className)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        className="absolute top-0 right-0 hover:bg-transparent"
        onClick={() => setshowPass((prev) => !prev)}
        disabled={props.value === "" || props.disabled}
      >
        {showPass ? (
          <LucideEye className="w-4 h-4" />
        ) : (
          <EyeClosedIcon className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
