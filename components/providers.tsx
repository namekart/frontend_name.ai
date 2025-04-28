import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import AppSidebarProvider from "./sidebar-provider";
import { SessionProvider } from "next-auth/react";
import { AuthModal } from "@/features/auth/components/auth-modal";
import { AuthInitializer } from "@/features/auth/components/auth-initializer";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <AppSidebarProvider>
          {children}
          <AuthModal />
          <AuthInitializer />
        </AppSidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
