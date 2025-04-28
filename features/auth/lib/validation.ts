import * as z from "zod";

// Sign In with Email/Password
export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type SignInValues = z.infer<typeof signInSchema>;

// Sign Up with Email/Password
export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type SignUpValues = z.infer<typeof signUpSchema>;

// Email OTP
export const emailOtpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
export type EmailOtpValues = z.infer<typeof emailOtpSchema>;

// Phone OTP
export const phoneOtpSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[0-9]+$/, "Please enter a valid phone number"),
});
export type PhoneOtpValues = z.infer<typeof phoneOtpSchema>;

// OTP Verification
export const otpVerificationSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP must be at least 4 digits")
    .max(6, "OTP cannot exceed 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only digits"),
});
export type OtpVerificationValues = z.infer<typeof otpVerificationSchema>;

// Password Reset
export const passwordResetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
export type PasswordResetValues = z.infer<typeof passwordResetSchema>;

// New Password
export const newPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type NewPasswordValues = z.infer<typeof newPasswordSchema>;
