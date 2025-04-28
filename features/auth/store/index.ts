"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthTab =
  | "signin"
  | "signup"
  | "forgotten-password"
  | "verify-otp"
  | "email-otp"
  | "phone-otp";

interface AuthState {
  isOpen: boolean;
  tab: AuthTab;
  forceModal: boolean;
  queryCount: number;
  otpType: "email" | "phone" | null;
  otpEmail: string | null;
  otpPhone: string | null;

  // Actions
  openModal: (tab?: AuthTab) => void;
  closeModal: () => void;
  setTab: (tab: AuthTab) => void;
  increaseQueryCount: () => void;
  setForceModal: (force: boolean) => void;
  startOtpFlow: (type: "email" | "phone", value: string) => void;
  resetOtpFlow: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isOpen: false,
      tab: "signin",
      forceModal: false,
      queryCount: 0,
      otpType: null,
      otpEmail: null,
      otpPhone: null,

      openModal: (tab) =>
        set((state) => ({
          isOpen: true,
          tab: tab || state.tab,
        })),

      closeModal: () =>
        set({
          isOpen: false,
        }),

      setTab: (tab) => set({ tab }),

      increaseQueryCount: () =>
        set((state) => {
          const newCount = state.queryCount + 1;
          // Force modal open after a certain number of queries
          const shouldForceModal = newCount >= 3 && !state.forceModal;

          return {
            queryCount: newCount,
            forceModal: shouldForceModal,
            isOpen: shouldForceModal ? true : state.isOpen,
          };
        }),

      setForceModal: (force) =>
        set({
          forceModal: force,
          isOpen: force,
        }),

      startOtpFlow: (type, value) =>
        set({
          otpType: type,
          ...(type === "email" ? { otpEmail: value } : { otpPhone: value }),
          tab: "verify-otp",
        }),

      resetOtpFlow: () =>
        set({
          otpType: null,
          otpEmail: null,
          otpPhone: null,
        }),
    }),
    {
      name: "auth-storage",
      // Don't persist the isOpen state - we want it to be true on each page load
      partialize: (state) => ({
        tab: state.tab,
        queryCount: state.queryCount,
        forceModal: state.forceModal,
        otpType: state.otpType,
        otpEmail: state.otpEmail,
        otpPhone: state.otpPhone,
      }),
    }
  )
);
