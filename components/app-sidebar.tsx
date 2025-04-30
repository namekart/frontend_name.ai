import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import NAME_AI_LOGO from "@/public/assets/name.ai.svg";
import Image from "next/image";
import Link from "next/link";
import { UserAuthSection } from "@/components/user-auth-section";
import { HistorySection } from "@/components/history-section";

export async function AppSidebar() {
  return (
    <Sidebar>
      <Link href={"/"} className="p-4">
        <Image
          width={150}
          height={40}
          alt="name.ai"
          src={NAME_AI_LOGO}
          className="h-auto w-auto"
        />
      </Link>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup title="Chat History">
          <HistorySection />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <UserAuthSection />
      </SidebarFooter>
    </Sidebar>
  );
}
