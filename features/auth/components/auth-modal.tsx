"use client";

import { useAuthStore } from "../store";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SignInForm } from "./signin-form";
import { SignUpForm } from "./signup-form";
import { ForgottenPasswordForm } from "./forgotten-password-form";
import { VerifyOtpForm } from "./verify-otp-form";

export function AuthModal() {
  const { isOpen, tab, closeModal } = useAuthStore();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        {tab === "signin" && <SignInForm />}
        {tab === "signup" && <SignUpForm />}
        {tab === "forgotten-password" && <ForgottenPasswordForm />}
        {tab === "verify-otp" && <VerifyOtpForm />}
      </DialogContent>
    </Dialog>
  );
}
