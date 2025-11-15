"use client";

import { Hourglass } from "lucide-react";
import { motion } from "framer-motion";

export default function ComingSoon({ 
  title = "Fitur Segera Hadir", 
  description = "Kami sedang menyiapkan fitur ini untuk memberikan pengalaman terbaik." 
}) {
  return (
    <div className="w-full flex justify-center items-center py-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center overflow-hidden border relative border-zinc-700 dark:bg-mute/50 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] max-w-lg bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
      >

        <div className="absolute left-[-30px] bottom-[-30px] -z-10 m-auto h-[110px] w-[110px] rounded-full bg-[#c93d2a] opacity-20 blur-[100px]"></div>
        <div className="absolute right-[-30px] top-[-30px] -z-10 m-auto h-[110px] w-[110px] rounded-full bg-[#c93d2a] opacity-20 blur-[100px]"></div>

        <div className="flex justify-center mb-5">
          <Hourglass className="w-12 h-12 text-amber-400 animate-pulse " strokeWidth={1.3} />
        </div>

        <h1 className="text-3xl font-semibold tracking-tight mb-2 text-gray-800 dark:text-gray-100">
          {title}
        </h1>

        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
