"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";

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
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] pointer-events-none bg-[radial-gradient(rgba(240,196,0,0.5)_1px,transparent_1px)] [background-size:16px_16px]" />
            
          </motion.div>
        </SwiperSlide>
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
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] pointer-events-none bg-[radial-gradient(rgba(240,196,0,0.5)_1px,transparent_1px)] [background-size:16px_16px]" />
            
          </motion.div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;

{/* <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div> */}
