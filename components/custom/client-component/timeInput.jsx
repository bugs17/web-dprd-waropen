"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";


export function TimeInput({ time, setTime, disabled }) {
  const [open, setOpen] = useState(false);
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  const handleSelect = (h, m) => {
    setTime(`${h}:${m}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal"
          disabled={disabled}
        >
          {time || "Pilih waktu"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex gap-2 max-h-60 overflow-y-auto">
          <div className="grid grid-cols-1 gap-1">
            {hours.map((h) => (
              <button
                key={h}
                className="text-sm px-2 py-1 rounded hover:bg-amber-100"
                onClick={() => handleSelect(h, time?.split(":")[1] || "00")}
              >
                {h}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-1">
            {minutes.map((m) => (
              <button
                key={m}
                className="text-sm px-2 py-1 rounded hover:bg-amber-100"
                onClick={() => handleSelect(time?.split(":")[0] || "00", m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
