"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store";
import {
  emailOtpSchema,
  type EmailOtpValues,
  phoneOtpSchema,
  type PhoneOtpValues,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone } from "lucide-react";
import { signInEmail, signInPhone } from "@/lib/actions/auth";
import { AuthButtonsGroup } from "./auth-buttons-group";

export function SignInForm() {
  const { setTab, startOtpFlow } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeMethod, setActiveMethod] = useState<"email" | "phone">("email");

  // Email form
  const emailForm = useForm<EmailOtpValues>({
    resolver: zodResolver(emailOtpSchema),
    defaultValues: {
      email: "",
    },
  });

  // Phone form
  const phoneForm = useForm<PhoneOtpValues>({
    resolver: zodResolver(phoneOtpSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleEmailOtpSubmit = async (data: EmailOtpValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await signInEmail(data.email);

      if (result.success) {
        startOtpFlow("email", data.email);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneOtpSubmit = async (data: PhoneOtpValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await signInPhone(data.phone);

      if (result.success) {
        startOtpFlow("phone", data.phone);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Choose your preferred sign in method
        </p>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <AuthButtonsGroup />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Tabs
        value={activeMethod}
        onValueChange={(value) => setActiveMethod(value as "email" | "phone")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="phone">
            <Phone className="mr-2 h-4 w-4" />
            Phone
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="mt-4 space-y-4">
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(handleEmailOtpSubmit)}
              className="space-y-4"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        {...field}
                        disabled={isLoading}
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
                    Sending code...
                  </span>
                ) : (
                  "Continue with Email"
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="phone" className="mt-4 space-y-4">
          <Form {...phoneForm}>
            <form
              onSubmit={phoneForm.handleSubmit(handlePhoneOtpSubmit)}
              className="space-y-4"
            >
              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        type="tel"
                        {...field}
                        disabled={isLoading}
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
                    Sending code...
                  </span>
                ) : (
                  "Continue with Phone"
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Button
          variant="link"
          className="px-0 font-normal"
          onClick={() => setTab("signup")}
          disabled={isLoading}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}
