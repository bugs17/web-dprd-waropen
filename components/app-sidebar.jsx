"use client"

import * as React from "react"
import {
  
  Frame,
  Scale,
  Notebook,
  Newspaper,
  SquareUserRound,
  ChartColumnIncreasing,
  CalendarCheck2,
  Puzzle,
  Users,
  Vote,
  Phone
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  menu1: [
    {
      name: "Dashboard",
      url: "#",
      icon: Frame,
    },
    {
      name: "Berita",
      url: "#",
      icon: Newspaper,
    },
    {
      name: "Anggota Dewan",
      url: "#",
      icon: SquareUserRound,
    },
    {
      name: "Jadwan Sidang",
      url: "#",
      icon: CalendarCheck2,
    },
  ],
  menu2: [
    {
      name: "Produk Hukum",
      url: "#",
      icon: Scale,
    },
    {
      name: "Renstra",
      url: "#",
      icon: Notebook,
    },
    {
      name: "Dokumen Keuangan",
      url: "#",
      icon: ChartColumnIncreasing,
    },
  ],
  menu3: [
    {
      name: "Komisi",
      url: "#",
      icon: Users,
    },
    {
      name: "Badan",
      url: "#",
      icon: Puzzle,
    },
    {
      name: "Fraksi",
      url: "#",
      icon: Vote,
    },
  ],
  menu4: [
    {
      name: "Kontak",
      url: "#",
      icon: Phone,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.menu1} />
        <NavProjects projects={data.menu2} />
        <NavProjects projects={data.menu3} />
        <NavProjects projects={data.menu4} />
      </SidebarContent>
      
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
