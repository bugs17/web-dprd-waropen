"use client"

import * as React from "react"
import {
  
  Frame,
  Newspaper,
  SquareUserRound,
  CalendarCheck2,
  Bandage,
  Vote,
  Phone,
  Handshake,
  FileText,
  ImagePlus,
  GitBranch,
  Building
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
    {
      name: "Anggota Dewan",
      url: "/dashboard/anggota-dewan",
      match: "/dashboard/anggota-dewan",
      icon: SquareUserRound,
    },
    {
      name: "Badan",
      url: "/dashboard/badan",
      match: "/dashboard/badan",
      icon: Building,
    },
    {
      name: "Struktur Setwan",
      url: "/dashboard/struktur-setwan",
      match: "/dashboard/struktur-setwan",
      icon: GitBranch,
    },
  ],
  menu4: [
    {
      name: "Galery",
      url: "/dashboard/galery",
      match: "/dashboard/galery",
      icon: ImagePlus,
    },
    {
      name: "Kontak & Alamat",
      url: "/dashboard/kontak-dan-alamat",
      match: "/dashboard/kontak-dan-alamat",
      icon: Phone,
    },
    {
      name: "Pengaturan Hero",
      url: "/dashboard/hero-setting",
      match: "/dashboard/hero-setting",
      icon: Bandage,
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
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
