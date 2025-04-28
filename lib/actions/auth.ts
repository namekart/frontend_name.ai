"use server";

import { signIn, signOut } from "@/lib/auth";
import { OtpVerificationValues } from "@/features/auth/lib/validation";

export const signInGitHub = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const signInTwitter = async () => {
  await signIn("twitter", { redirectTo: "/" });
};

export const signInGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const signInApple = async () => {
  await signIn("apple", { redirectTo: "/" });
};

export const signInEmail = async (email: string) => {
  // In a real application, this would send an email with a code
  // For demo purposes, we'll just console log
  console.log(`Sending email verification to ${email}`);

  // For testing, the verification code would always be "123456"
  return {
    success: true,
    message: `Verification code sent to ${email}`,
  };
};

export const signInPhone = async (phone: string) => {
  // In a real application, this would send an SMS with a code
  // For demo purposes, we'll just console log
  console.log(`Sending SMS verification to ${phone}`);

  // For testing, the verification code would always be "123456"
  return {
    success: true,
    message: `Verification code sent to ${phone}`,
  };
};

export const verifyOtp = async (
  data: OtpVerificationValues,
  type: "email" | "phone",
  value: string
) => {
  // In a real application, this would verify the code
  // For demo purposes, we'll just check if it's "123456"
  if (data.otp !== "123456") {
    return {
      success: false,
      error: "Invalid verification code",
    };
  }

  // If verification succeeds, in a real app we would create a session
  console.log(`Successfully verified ${type}: ${value} with code ${data.otp}`);

  // Here we would typically create a user account or generate a JWT token
  return {
    success: true,
    user: {
      id: `user_${Math.random().toString(36).substring(2, 9)}`,
      name:
        type === "email"
          ? value.split("@")[0]
          : `User_${value.substring(value.length - 4)}`,
      email:
        type === "email"
          ? value
          : `user-${Math.random().toString(36).substring(2, 9)}@example.com`,
      phone: type === "phone" ? value : null,
      image: `https://avatar.vercel.sh/${value}`,
    },
  };
};

export const signInFacebook = async () => {
  await signIn("facebook", { redirectTo: "/" });
};

export const signInMicrosoft = async () => {
  await signIn("microsoft-entra-id", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
