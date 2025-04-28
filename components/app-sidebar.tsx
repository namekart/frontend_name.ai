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

export async function AppSidebar() {
  return (
    <Sidebar>
      <Link href={"/"} className="p-4">
        <Image width={150} height={20} alt="name.ai" src={NAME_AI_LOGO} />
      </Link>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <UserAuthSection />
      </SidebarFooter>
    </Sidebar>
  );
}
