import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#2563EB] text-white shadow hover:bg-[#1E40AF]",
        secondary:
          "border-transparent bg-[#F3F4F6] text-[#111827] hover:bg-[#E5E7EB]",
        destructive:
          "border-transparent bg-[#DC2626] text-white shadow hover:bg-[#B91C1C]",
        outline: "text-[#111827] border-[#D1D5DB]",
        success:
          "border-transparent bg-[#10B981] text-white shadow hover:bg-[#059669]",
        warning:
          "border-transparent bg-[#F59E0B] text-white shadow hover:bg-[#D97706]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
