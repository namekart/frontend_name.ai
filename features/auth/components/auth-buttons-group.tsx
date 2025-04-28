"use client";

import { AuthProviderButton } from "./auth-provider-button";
import { cn } from "@/lib/utils";

type ProviderType =
  | "google"
  | "github"
  | "facebook"
  | "twitter"
  | "microsoft"
  | "apple";

interface AuthButtonsGroupProps {
  className?: string;
  variant?: "default" | "compact";
  exclude?: Array<ProviderType>;
}

export function AuthButtonsGroup({
  className,
  variant = "default",
  exclude = [],
}: AuthButtonsGroupProps) {
  const providers: ProviderType[] = [
    "google",
    "github",
    "facebook",
    "twitter",
    "microsoft",
    "apple",
  ];

  const filteredProviders = providers.filter(
    (provider) => !exclude.includes(provider)
  );

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap gap-2 justify-center", className)}>
        {filteredProviders.slice(0, 4).map((provider) => (
          <CompactProviderButton key={provider} provider={provider} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4", className)}>
      {filteredProviders.map((provider) => (
        <AuthProviderButton key={provider} provider={provider} />
      ))}
    </div>
  );
}

interface CompactProviderButtonProps {
  provider: ProviderType;
}

function CompactProviderButton({ provider }: CompactProviderButtonProps) {
  return (
    <AuthProviderButton provider={provider} className="!w-auto !px-4 !py-2" />
  );
}
