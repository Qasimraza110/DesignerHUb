"use client";

import * as React from "react";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg",

        outline:
          "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",

        ghost:
          "text-indigo-600 hover:bg-indigo-100",

        gradient:
          "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700",

        yellow:
          "bg-yellow-400 text-black hover:bg-yellow-300 shadow-md",

        dark:
          "bg-slate-900 text-white hover:bg-slate-800 shadow-lg",
      },
      size: {
        sm: "h-9 px-4 rounded-lg text-sm",
        default: "h-11 px-6 rounded-xl text-sm",
        lg: "h-12 px-8 rounded-xl text-base",
        xl: "h-14 px-10 rounded-2xl text-lg",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };