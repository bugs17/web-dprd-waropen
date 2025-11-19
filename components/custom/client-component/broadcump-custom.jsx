"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import Link from "next/link";
  import { usePathname } from "next/navigation";
import React from "react";

const BroadcumCustom = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    let fullPath = "";
    // Cari index segment 'detail-anggota-dprk'
    const stopIndex = pathSegments.findIndex(segment => segment === 'detail-anggota-dprk');
    // Jika tidak ada, ambil semua segment
    const segmentsToRender = stopIndex >= 0 ? pathSegments.slice(0, stopIndex + 1) : pathSegments;



  return (
    <div className='w-full h-10 bg-[#533a4e] flex items-center lg:pl-24 pl-3'>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href={"/"} className={"text-gray-400 lg:text-base text-xs"}>Home</Link>
                </BreadcrumbItem>
                
                

                {segmentsToRender.map((segment, index) => {
                fullPath += `/${segment}`;
                const isLast = index === segmentsToRender.length - 1;

                // Capitalize dan ganti dash dengan spasi
                const label = segment
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase());

                return (
                    <React.Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className={`${isLast ? "text-white" : "text-gray-400 lg:text-base text-xs"}`}>
                        {label}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                    </React.Fragment>
                );
                })}
                
            </BreadcrumbList>
        </Breadcrumb>
    </div>
  )
}

export default BroadcumCustom