import { PropsWithChildren } from "react";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export default function AppSidebarProvider({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="cursor-pointer" />
      <main className="flex-1 flex items-center justify-center w-full pr-6">
        {children}
      </main>
    </SidebarProvider>
  );
}
