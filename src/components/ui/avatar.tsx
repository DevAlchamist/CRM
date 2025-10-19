import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-md",
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, width, height, src, onError, ...props }, ref) => {
  const [hasError, setHasError] = React.useState(false);
  const resolvedSrc = typeof src === 'string' && src ? src : undefined;

  if (hasError || !resolvedSrc) {
    // Hide image so AvatarFallback (initials) can show
    return null;
  }

  return (
    <Image
      ref={ref}
      className={cn("aspect-square h-full w-full object-cover", className)}
      alt=""
      src={resolvedSrc}
      width={width ? Number(width) : 40}
      height={height ? Number(height) : 40}
      onError={(e) => {
        setHasError(true);
        onError?.(e as unknown as React.SyntheticEvent<HTMLImageElement, Event>);
      }}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-md bg-[#F3F4F6] text-sm font-medium text-[#6B7280]",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
