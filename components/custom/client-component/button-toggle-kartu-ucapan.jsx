"use client";
import { toggleKartuUcapan } from "@/action/edit-kartu-ucapan";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useTransition } from "react";

const ButtonToggleKartuUcapan = ({ idKartuUcapan, isShow }) => {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        await toggleKartuUcapan(idKartuUcapan, isShow);
      } catch (error) {
        console.error("Gagal toggle:", error);
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={handleToggle}
      className="cursor-pointer"
    >
      {isPending ? (
        <>
          <Loader2 size={14} className="animate-spin" />
          <span>Memproses...</span>
        </>
      ) : isShow ? (
        <>
          <Eye size={14} />
          <span>Tampil</span>
        </>
      ) : (
        <>
          <EyeOff size={14} />
          <span>Disembunyikan</span>
        </>
      )}
    </Button>
  );
};

export default ButtonToggleKartuUcapan;