"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { IoHome, IoLayers } from "react-icons/io5";

import { IoIosMail } from "react-icons/io";
import { FaUserAlt, FaChevronUp, FaChevronDown } from "react-icons/fa";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";

const items = [
  {
    title: "Home",
    url: "/",
    icon: IoHome,
    id: 1,
  },
  {
    title: "Projekte",
    url: "/projects",
    icon: IoLayers,
    id: 2,
  },
  {
    title: "Benachrichtigungen",
    url: "/notifications",
    icon: IoIosMail,
    id: 5,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <span className="font-bold text-2xl">Project-Pilot</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="bg-card" />

      <SidebarContent className="bg-background text-my-foreground font-bold">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Button className="mt-10 flex justify-between bg-card text-foreground hover:bg-muted-foreground">
                <div>Workspace</div>
                <span className="text-4xl">
                  <FaChevronUp />
                  <FaChevronDown />
                </span>
              </Button>
              {items.map((item) => (
                <SidebarMenuItem className="my-4" key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <span className="text-2xl text-gold">
                        <item.icon />
                      </span>
                      <span className="text-xl">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-card">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="text-lg flex justify-between">
                  <div className="flex items-center gap-2">
                    <FaUserAlt />
                    UserName
                  </div>
                  <FaChevronUp />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-lg">Account</DropdownMenuItem>
                <DropdownMenuItem className="text-lg">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-lg text-red-500">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
