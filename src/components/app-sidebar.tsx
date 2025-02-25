import { PersonStanding } from "lucide-react";
import { House } from "lucide-react";

import tjLogo from "../../public/tj-logo.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Card } from "./ui/card";
import LogoutButton from "./logout-button";

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

type Props = {
  email: string;
};

export function AppSidebar(props: Props) {
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
      <SidebarFooter>
        <Card className="p-2 space-y-2">
          <p className="text-sm">Signed in as: {props.email}</p>
          <LogoutButton />
        </Card>
      </SidebarFooter>
    </Sidebar>
  );
}
