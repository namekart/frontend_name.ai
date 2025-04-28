"use client";

import { LogIn, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  signInGitHub,
  logout,
  signInGoogle,
  signInApple,
  signInFacebook,
  signInMicrosoft,
} from "@/lib/actions/auth";

export function SignInGitHub() {
  return (
    <Button className="w-full" onClick={() => signInGitHub()}>
      <LogIn />
      Sign in
    </Button>
  );
}

export function SignOut() {
  return (
    <Button className="w-full" onClick={() => logout()}>
      <LogOut />
      Sign out
    </Button>
  );
}
