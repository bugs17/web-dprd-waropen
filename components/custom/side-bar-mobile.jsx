"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowUpRight, ChevronRight, Menu } from "lucide-react"
import { motion } from "framer-motion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import Link from "next/link"



const SideBarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div
        initial={{opacity:0, x:100}}
        animate={{opacity:1, x:0}}
        transition={{
            type:'spring',
            stiffness:100,
            damping:25,
            delay:0.3,
            duration:1.2
        }}
        className='lg:hidden px-3 items-center justify-end flex h-full'>
          <Menu size={32} className='text-[#f0c400]' />
        </motion.div>
      </SheetTrigger>
      <SheetContent className="bg-[#231c26] border-none" side="left">
        <SheetHeader>
          <SheetTitle className="text-white">Menu</SheetTitle>
        </SheetHeader>

        <div className="w-full h-full">
            <Collapsible
                asChild
                defaultOpen={false}
                className="group/collapsible"
            >
                <div className="">
                    <CollapsibleTrigger asChild>
                        <div className="flex flex-row w-full justify-between items-center px-2 mb-3">
                            <span className="text-white">Tentang DPRD</span>
                            <ChevronRight className="ml-auto text-[#f0c400] transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </div>
                    </CollapsibleTrigger>

                    {['Anggota Dprd', 'Komisi', 'Badan', 'Fraksi'].map((item, index) => (
                        <CollapsibleContent key={index}>
                        <div className="w-full pl-6 mb-2">
                            <SheetClose asChild >
                                <Link className="text-xs text-white flex flex-row items-center gap-2" href='#'>
                                    <ArrowUpRight className="text-[#f0c400]" size={12} />
                                    <span>{item}</span>
                                </Link>
                            </SheetClose>
                        </div>
                        </CollapsibleContent>
                    ))}
                    
                </div>
                
            </Collapsible>
            
        </div>
        
        <SheetFooter className="w-full px-0 pb-0">
          <div className="w-full h-12">
            halooo
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SideBarMobile