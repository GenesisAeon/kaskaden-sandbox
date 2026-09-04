import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-2xs font-medium tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-elevated text-muted",
        destab: "bg-destab/15 text-destab",
        stab: "bg-stab/15 text-stab",
        unclear: "bg-elevated text-subtle shadow-border",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
