"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="h-[calc(100vh-112px)] w-full">
      <Swiper
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="h-full w-full"
      >
        <SwiperSlide className="w-full h-full">
          <motion.div 
            initial={{opacity:0 }}
            animate={{opacity:1}}
            transition={{
                type:'spring',
                stiffness:100,
                damping:25,
                delay:0.3,
                duration:1.8
            }}
            className="relative h-full w-full">
            {/* Gambar biasa (bukan absolute) */}
            <img
              src="/hero1.jpg"
              className="h-full w-full object-cover relative"
            />
            {/* Overlay di atas */}
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] pointer-events-none " ></div>
            <motion.div className="z-40 w-full absolute left-0 top-0 bottom-0 flex flex-col justify-center items-center"
            initial={{opacity:0 }}
            animate={{opacity:1}}
            transition={{
                type:'spring',
                stiffness:100,
                damping:25,
                delay:0.5,
                duration:1.8
            }}
            >
              <span className="text-white lg:text-6xl text-2xl font-extrabold lg:mb-5 mb-3">Suara Rakyat, Tugas Kami</span>
              <span className="text-gray-300 sm:text-sm font-sans">Website Resmi DPRK Waropen.</span>
              
              <Link href={'#'} className="lg:max-w-[30%] mt-8 py-1 flex flex-row items-center px-3 bg-gradient-to-r from-amber-500 to-orange-300 hover:from-orange-300 hover:to-amber-500 border border-white hover:border-amber-200 group cursor-pointer rounded-full">
                <span className="font-mono group-hover:text-black text-sm text-white">Berita terbaru ⚡️</span>
                
                <span className="flex flex-row items-center gap-1 pl-2">
                  <span className="font-semibold text-sm group-hover:text-black text-white">Lihat </span>
                  <ArrowRight size={12} className="text-white group-hover:text-black"/>
                </span>

              </Link>
            </motion.div>
          </motion.div>
        </SwiperSlide>
        
      </Swiper>
    </section>
  );
};

export default Hero;

{/* <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div> */}
