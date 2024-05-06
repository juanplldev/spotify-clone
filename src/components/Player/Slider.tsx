import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import cn from "clsx";


export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 flex touch-none select-none items-center group",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-[#4d4d4d]">
      <SliderPrimitive.Range className="absolute h-full bg-white group-hover:bg-[#1db954]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="hidden group-hover:block h-3 w-3 cursor-pointer bg-white rounded-full bg-background ring-offset-transparent transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName