"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export default function FraksiDropdown({ options = [], value = null, onSelect, placeholder = "Pilih Fraksi", disabled = false }) {
  const [selectedId, setSelectedId] = useState(value)

  useEffect(() => {
    setSelectedId(value)
  }, [value])

  const handleSelect = (item) => {
    setSelectedId(item.id)
    if (onSelect) onSelect(item)
  }

  const selectedItem = options.find(o => o.id === selectedId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button disabled={disabled} className="w-full text-slate-500 bg-[#222222] px-3 py-1 border rounded-md text-left flex items-center justify-between">
          {selectedItem ? selectedItem.nama : <span className="text-gray-500">{placeholder}</span>}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]">
        {options.map((item) => (
          <DropdownMenuItem key={item.id} onSelect={() => handleSelect(item)} className="flex items-center gap-3 px-3 py-2 hover:bg-accent/50 cursor-pointer">
            <span>{item.nama}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
