"use client";
import { Facebook, Link2, Share2, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';



const ShareBeritaComponent = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const copy = async () => {
        await navigator.clipboard.writeText(url);
        toast.success("Link berhasil dicopy!");
    };

    const shareFacebook = () => {
        const link = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(link, "_blank");
    };

    const shareX = () => {
    const link = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    window.open(link, "_blank");
    };

    const shareNative = () => {
    if (navigator.share) {
        navigator.share({ url });
    } else {
        toast.error("Browser tidak mendukung native share");
    }
    };
    
  return (
    <div className='flex flex-row gap-2 items-center'>
        <span className='text-white hidden lg:flex text-sm'>Bagikan melalui</span>
        <div className='border border-white rounded-full p-1'>
            <Link2 onClick={copy} className='text-white hover:text-amber-400 cursor-pointer' size={18} />
        </div>
        <div className='border border-white rounded-full p-1'>
        <Facebook onClick={shareFacebook} className='text-white hover:text-blue-500 cursor-pointer' size={18} />
        </div>
        <div className='border border-white rounded-full p-1'>
        <Twitter onClick={shareX} className='text-white hover:text-white cursor-pointer' size={18} />
        </div>
        <div className='border border-white rounded-full p-1'>
            <Share2 onClick={shareNative} className='text-white hover:text-green-500 cursor-pointer' size={18} />
        </div>
        
    </div>
  )
}

export default ShareBeritaComponent