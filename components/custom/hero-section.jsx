"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getHero } from "@/action/get-hero";

const Hero = () => {
  const [heroList, setHeroList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHero();
        if (data && data.length > 0) {
          setHeroList(data);
        }
      } catch (error) {
        console.error("Gagal memuat data hero:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-112px)] w-full flex items-center justify-center bg-zinc-950 text-amber-400">
        <Loader className="w-6 h-6 animate-spin mr-2" /> Memuat hero...
      </div>
    );
  }

  // Fallback jika data kosong
  const slides = heroList.length > 0 ? heroList : [
    {
      id: 'default',
      tagline: "Suara Rakyat, Tugas Kami",
      description: "Website Resmi DPRK Waropen",
      urlImage: null
    }
  ];

  return (
    <section className="h-[calc(100vh-112px)] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect={"fade"}
        autoplay={{
          delay: 4500, // Waktu pindah slide (4.5 detik)
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000} // Kecepatan transisi fade
        className="h-full w-full"
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id} className="w-full h-full relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                duration: 1.8,
              }}
              className="relative h-full w-full"
            >
              {/* Gambar Hero */}
              {item.urlImage ? (
                <Image
                  src={`/api/hero/image/${item.urlImage}`}
                  alt={item.tagline || "Hero Image"}
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

              {/* Konten Teks */}
              <motion.div
                className="z-40 w-full absolute left-0 top-0 bottom-0 flex flex-col justify-center items-center text-center px-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 25,
                  delay: 0.2,
                  duration: 1.2,
                }}
              >
                <span className="text-white lg:text-6xl text-2xl font-extrabold lg:mb-5 mb-3 max-w-4xl">
                  Suara Rakyat, Tugas Kami
                </span>
                <span className="text-gray-300 sm:text-sm font-sans max-w-xl">
                  Website Resmi DPRK Waropen 
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
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;