import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full",
        "bg-elevated shadow-border transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        "data-[state=checked]:bg-fg",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-accent-fg shadow-border",
          "transition-transform duration-150 ease-out",
          "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
