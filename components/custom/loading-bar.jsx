"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const LoadingBar = () => {


    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [prevPath, setPrevPath] = useState(pathname);

    useEffect(() => {
        if (pathname !== prevPath) {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
            setPrevPath(pathname);
        }, 800); // durasi animasi loading

        return () => clearTimeout(timer);
        }
    }, [pathname, prevPath])

  return (
    <AnimatePresence>
        {loading && (
            <div className="absolute top-0 h-1 w-11 left-1/2 -translate-x-1/2 bg-[#231c26]rounded-full">
            <motion.span
                className="block h-1 w-full bg-[#f0c400] rounded-full origin-center"
                style={{ transformOrigin: 'center' }}
                initial={{ scaleX: 0.3, opacity:0.3 }}
                animate={{ scaleX: 1, opacity:1 }}
                transition={{
                duration: 0.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                }}
            />
            </div>
        )}
    </AnimatePresence>
  );
};

export default LoadingBar;
