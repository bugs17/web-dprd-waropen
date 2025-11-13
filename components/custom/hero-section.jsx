"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getHero } from "@/action/get-hero";

const Hero = () => {
  const [dataHero, setDataHero] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHero();
      if (data) setDataHero(data);
    };
    fetchData();
  }, []);

  return (
    <section className="h-[calc(100vh-112px)] w-full">
      <Swiper className="h-full w-full">
        <SwiperSlide className="w-full h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              delay: 0.3,
              duration: 1.8,
            }}
            className="relative h-full w-full"
          >
            {/* Gambar Hero */}
            {dataHero?.urlImage ? (
              <Image
                src={`/api/hero/image/${dataHero.urlImage}`}
                alt="Hero Image"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="/placeholder.png"
                priority
              />
            ) : (
              <Image
                src="/placeholder.png"
                alt="Hero Placeholder"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="/placeholder.png"
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] pointer-events-none" />

            {/* Konten teks */}
            <motion.div
              className="z-40 w-full absolute left-0 top-0 bottom-0 flex flex-col justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                delay: 0.5,
                duration: 1.8,
              }}
            >
              <span className="text-white lg:text-6xl text-2xl font-extrabold lg:mb-5 mb-3">
                {dataHero?.tagline || <Loader className="text-amber-400 animate-spin" />}
              </span>
              <span className="text-gray-300 sm:text-sm font-sans">
                {dataHero?.description || ""}
              </span>

              <Link
                href={`/berita`}
                className="lg:max-w-[30%] mt-8 py-1 flex flex-row items-center px-3 bg-gradient-to-r from-amber-500 to-orange-300 hover:from-orange-300 hover:to-amber-500 border border-white hover:border-amber-200 group cursor-pointer rounded-full"
              >
                <span className="font-mono group-hover:text-black text-sm text-white">
                  Berita terbaru ⚡️
                </span>

                <span className="flex flex-row items-center gap-1 pl-2">
                  <span className="font-semibold text-sm group-hover:text-black text-white">
                    Lihat
                  </span>
                  <ArrowRight
                    size={12}
                    className="text-white group-hover:text-black"
                  />
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
