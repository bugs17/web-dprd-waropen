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
  Phone,
  Handshake,
  FileText
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
      url: "/dashboard",
      match: "/dashboard/fsf",
      icon: Frame,
    },
    {
      name: "Berita",
      url: "/dashboard/berita",
      match: "/dashboard/berita",
      icon: Newspaper,
    },
    {
      name: "Anggota Dewan",
      url: "/dashboard/anggota-dewan",
      match: "/dashboard/anggota-dewan",
      icon: SquareUserRound,
    },
    {
      name: "Jadwan",
      url: "/dashboard/jadwal",
      match: "/dashboard/jadwal",
      icon: CalendarCheck2,
    },
    {
      name: "Dokumen",
      url: "/dashboard/docs",
      match: "/dashboard/docs",
      icon: FileText,
    },
  ],
  // menu2: [
    
    
  // ],
  menu3: [
    // {
    //   name: "Komisi",
    //   url: "#",
    //   icon: Users,
    // },
    // {
    //   name: "Badan",
    //   url: "#",
    //   icon: Puzzle,
    // },
    {
      name: "Fraksi",
      url: "/dashboard/fraksi",
      match: "/dashboard/fraksi",
      icon: Vote,
    },
    {
      name: "Partai",
      url: "/dashboard/partai",
      match: "/dashboard/partai",
      icon: Handshake,
    },
  ],
  menu4: [
    {
      name: "Kontak & Alamat",
      url: "/dashboard/kontak-dan-alamat",
      match: "/dashboard/kontak-dan-alamat",
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
        {/* <NavProjects projects={data.menu2} /> */}
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
