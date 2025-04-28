"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  signInGitHub,
  signInGoogle,
  signInApple,
  signInFacebook,
  signInMicrosoft,
  signInTwitter,
} from "@/lib/actions/auth";
import Image from "next/image";

type ProviderType =
  | "google"
  | "github"
  | "facebook"
  | "twitter"
  | "microsoft"
  | "apple";

interface ProviderConfig {
  name: string;
  icon: string;
  className?: string;
  action: () => Promise<void>;
}

const PROVIDERS: Record<ProviderType, ProviderConfig> = {
  google: {
    name: "Google",
    icon: "/assets/icons/google.svg",
    className: "hover:bg-[#4285F4]/10",
    action: signInGoogle,
  },
  github: {
    name: "GitHub",
    icon: "/assets/icons/github.svg",
    className: "hover:bg-gray-100 dark:hover:bg-gray-800",
    action: signInGitHub,
  },
  facebook: {
    name: "Facebook",
    icon: "/assets/icons/facebook.svg",
    className: "hover:bg-[#1877F2]/10",
    action: signInFacebook,
  },
  twitter: {
    name: "X (Twitter)",
    icon: "/assets/icons/twitter.svg",
    className: "hover:bg-gray-100 dark:hover:bg-gray-800",
    action: signInTwitter,
  },
  microsoft: {
    name: "Microsoft",
    icon: "/assets/icons/microsoft.svg",
    className: "hover:bg-gray-100 dark:hover:bg-gray-800",
    action: signInMicrosoft,
  },
  apple: {
    name: "Apple",
    icon: "/assets/icons/apple.svg",
    className: "hover:bg-gray-100 dark:hover:bg-gray-800",
    action: signInApple,
  },
};

interface AuthProviderButtonProps {
  provider: ProviderType;
  className?: string;
}

export function AuthProviderButton({
  provider,
  className,
}: AuthProviderButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    name,
    icon,
    className: providerClassName,
    action,
  } = PROVIDERS[provider];

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await action();
    } catch (error) {
      console.error("Error signing in with provider:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "flex w-full items-center justify-center gap-2",
        providerClassName,
        className
      )}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <Image
          src={icon}
          alt={name}
          width={16}
          height={16}
          className="h-4 w-4"
        />
      )}
      <span>Continue with {name}</span>
    </Button>
  );
}
