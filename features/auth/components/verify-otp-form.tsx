"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store";
import { verifyOtp } from "@/lib/actions/auth";
import {
  otpVerificationSchema,
  type OtpVerificationValues,
} from "../lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function VerifyOtpForm() {
  const { otpType, otpEmail, otpPhone, setTab, resetOtpFlow } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Auto-focus the input field when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Countdown timer for resend code
    if (resendCountdown <= 0) return;

    const timer = setTimeout(() => {
      setResendCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const form = useForm<OtpVerificationValues>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Determine which value to use
  const otpValue = otpType === "email" ? otpEmail : otpPhone;

  // If we don't have the necessary data, go back to sign in
  if (!otpType || !otpValue) {
    setTab("signin");
    return null;
  }

  const handleVerifyOtpSubmit = async (data: OtpVerificationValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await verifyOtp(data, otpType, otpValue);

      if (!result.success && result.error) {
        setError(result.error);
      } else if (result.success) {
        // Success! Store user data and redirect
        // In a real app, this would create a session
        localStorage.setItem("auth-user", JSON.stringify(result.user));
        resetOtpFlow();
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    setTab(otpType === "email" ? "email-otp" : "phone-otp");
    setResendCountdown(60);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <Button
          variant="ghost"
          size="sm"
          className="self-start -ml-2 mb-2"
          onClick={() => {
            resetOtpFlow();
            setTab("signin");
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-2xl font-semibold tracking-tight">
          Verification Code
        </h1>
        <p className="text-sm text-muted-foreground">
          {otpType === "email" ? (
            <>
              <Mail className="h-4 w-4 inline mr-1" />
              We&apos;ve sent a code to {otpEmail}
            </>
          ) : (
            <>
              <Phone className="h-4 w-4 inline mr-1" />
              We&apos;ve sent a code to {otpPhone}
            </>
          )}
        </p>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleVerifyOtpSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-center block">
                  Enter verification code
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="• • • • • •"
                    disabled={isLoading}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest font-medium h-14"
                    ref={inputRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Verifying...
              </span>
            ) : (
              "Verify and Continue"
            )}
          </Button>

          <div className="text-center text-sm">
            Didn&apos;t receive the code?{" "}
            {resendCountdown > 0 ? (
              <span className="text-muted-foreground">
                Resend in {resendCountdown}s
              </span>
            ) : (
              <Button
                variant="link"
                className="px-0 font-normal"
                onClick={handleResendCode}
                disabled={isLoading}
              >
                Resend Code
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
