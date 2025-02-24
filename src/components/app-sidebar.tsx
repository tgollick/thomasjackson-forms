import { PersonStanding } from "lucide-react";
import { House } from "lucide-react";

import tjLogo from "../../public/tj-logo.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Tenancy Applications",
    url: "/dashboard/tenancy-applications",
    icon: PersonStanding,
  },
  {
    title: "Buyer Offers",
    url: "/dashboard/buyer-offers",
    icon: House,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 p-2 pb-0">
          <Image
            src={tjLogo}
            alt="Thomas Jackson Logo"
            width="30"
            height="30"
          />
          <p className="text-xl">Dashboard</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Form Responses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
