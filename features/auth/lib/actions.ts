"use server";

import {
  SignInValues,
  SignUpValues,
  EmailOtpValues,
  PhoneOtpValues,
  OtpVerificationValues,
  PasswordResetValues,
} from "./validation";

// Response types
type SuccessUserResponse = {
  success: true;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    phone?: string | null;
  };
};

type SuccessMessageResponse = {
  success: true;
  message: string;
};

type ErrorResponse = {
  success: false;
  error: string;
};

// Currently these are mock implementations
// They would be replaced with actual authentication logic

export async function signIn(
  data: SignInValues
): Promise<SuccessUserResponse | ErrorResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock success/failure
  if (data.email === "error@example.com") {
    return {
      success: false,
      error: "Invalid email or password",
    };
  }

  return {
    success: true,
    user: {
      id: "user_123",
      name: "John Doe",
      email: data.email,
      image: "https://avatar.vercel.sh/user",
    },
  };
}

export async function signUp(
  data: SignUpValues
): Promise<SuccessUserResponse | ErrorResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock success/failure
  if (data.email === "exists@example.com") {
    return {
      success: false,
      error: "Email already in use",
    };
  }

  return {
    success: true,
    user: {
      id: "user_new",
      name: data.name,
      email: data.email,
      image: "https://avatar.vercel.sh/new",
    },
  };
}

export async function signInWithProvider(
  provider: string
): Promise<{ success: true; provider: string } | ErrorResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would redirect to the provider's OAuth flow
  // For now, we simulate success
  return {
    success: true,
    provider,
  };
}

export async function sendEmailOtp(
  data: EmailOtpValues
): Promise<SuccessMessageResponse | ErrorResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: `OTP sent to ${data.email}`,
  };
}

export async function sendPhoneOtp(
  data: PhoneOtpValues
): Promise<SuccessMessageResponse | ErrorResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: `OTP sent to ${data.phone}`,
  };
}

export async function verifyOtp(
  data: OtpVerificationValues,
  type: "email" | "phone",
  value: string
): Promise<SuccessUserResponse | ErrorResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock success/failure based on OTP value
  if (data.otp !== "123456") {
    return {
      success: false,
      error: "Invalid OTP",
    };
  }

  return {
    success: true,
    user: {
      id: "user_otp",
      name: "OTP User",
      email:
        type === "email"
          ? value
          : `user-${Math.random().toString(36).substring(7)}@example.com`,
      phone: type === "phone" ? value : null,
      image: "https://avatar.vercel.sh/otp",
    },
  };
}

export async function forgotPassword(
  data: PasswordResetValues
): Promise<SuccessMessageResponse | ErrorResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock success/failure
  try {
    if (data.email === "error@example.com") {
      return {
        success: false,
        error: "Account not found",
      };
    }

    return {
      success: true,
      message: `Password reset link sent to ${data.email}`,
    };
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      success: false,
      error: "Failed to send reset link",
    };
  }
}

export async function signOut(): Promise<{ success: true }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
  };
}
