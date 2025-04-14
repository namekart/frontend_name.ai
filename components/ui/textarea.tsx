import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground aria-invalid:border-destructive  flex field-sizing-content min-h-16 w-full rounded-md border text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
