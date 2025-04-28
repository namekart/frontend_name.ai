"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "../hooks/use-auth";
import { LogIn } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  showIcon?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function AuthButton({
  showIcon = true,
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: AuthButtonProps) {
  const { status, openAuthModal } = useAuth();

  const handleClick = () => {
    if (status === "unauthenticated") {
      openAuthModal("signin");
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={cn(className)}
      {...props}
    >
      {showIcon && <LogIn className="mr-2 h-4 w-4" />}
      {children || "Sign In"}
    </Button>
  );
}
