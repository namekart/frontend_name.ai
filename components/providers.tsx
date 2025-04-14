import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import AppSidebarProvider from "./sidebar-provider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppSidebarProvider>{children}</AppSidebarProvider>
    </ThemeProvider>
  );
}
