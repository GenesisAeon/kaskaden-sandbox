import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetPortal = DialogPrimitive.Portal;

export function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn("fixed inset-0 z-40 bg-bg/70", className)}
      {...props}
    />
  );
}

export function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col overflow-y-auto bg-surface text-fg shadow-border",
          "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-xl p-5",
          "sm:inset-y-0 sm:right-0 sm:left-auto sm:bottom-auto sm:h-full sm:w-[min(100%,28rem)] sm:rounded-none sm:rounded-l-xl sm:p-6",
          "transition-[transform,opacity] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-elevated hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          aria-label="Schließen"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "pr-10 font-heading text-xl leading-snug tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm leading-relaxed text-muted", className)}
      {...props}
    />
  );
}
