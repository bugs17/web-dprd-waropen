"use client";
import { toggleKartuUcapan } from "@/action/edit-kartu-ucapan";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const ButtonToggleKartuUcapan = ({ idKartuUcapan, isShow }) => {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (checked) => {
    startTransition(async () => {
      try {
        await toggleKartuUcapan(idKartuUcapan, isShow);
      } catch (error) {
        console.error("Gagal toggle:", error);
      }
    });
  };

  return (
    <span className="inline-flex items-center space-x-2 align-middle">
      {isPending && <Loader2 size={14} className="animate-spin text-muted-foreground" />}
      <Switch
        checked={isShow}
        disabled={isPending}
        onCheckedChange={handleToggle}
        className="cursor-pointer"
      />
    </span>
  );
};

export default ButtonToggleKartuUcapan;