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


  return (
    <div className='w-full h-10 bg-[#533a4e] flex items-center lg:pl-24 pl-3'>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href={"/"} className={"text-gray-400 lg:text-base text-xs"}>Home</Link>
                </BreadcrumbItem>
                
                {pathSegments.map((segment, index) => {
                    fullPath += `/${segment}`;
                    const isLast = index === pathSegments.length - 1;

                    // Capitalize dan ganti dash dengan spasi
                    const label = segment
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase());

                    return(
                        <React.Fragment key={index}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className={`${isLast ? "text-white font-semibold" : "text-gray-400 lg:text-base text-xs"}`}>{label}</BreadcrumbPage>
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