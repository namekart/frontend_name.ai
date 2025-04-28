"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { AuthButton } from "@/features/auth/components/auth-button";
import { Loader2 } from "lucide-react";

export function UserAuthSection() {
  const { user, status } = useAuth();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="p-4">
        <AuthButton className="w-full" showIcon />
      </div>
    );
  }

  return (
    <div className="border-t border-border p-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={user?.image || `https://avatar.vercel.sh/${user?.name}`}
            alt={user?.name || "User"}
          />
          <AvatarFallback>
            {getUserInitials(user?.name || "Guest")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium leading-none truncate">
            {user?.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {user?.email}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <SignOutButton className="w-full" />
      </div>
    </div>
  );
}

function getUserInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}
