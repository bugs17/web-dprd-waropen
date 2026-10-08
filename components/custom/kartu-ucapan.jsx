"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getAllKartuUcapan } from "@/action/get-all-kartu-ucapan";

const KartuUcapan = () => {
  const [dataKartuUcapan, setDataKartuUcapan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllKartuUcapan();
        setDataKartuUcapan(result || []);
      } catch (error) {
        console.error("Gagal memuat kartu ucapan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Jika sedang loading atau data kosong, jangan render apa pun (return null)
  if (loading || !dataKartuUcapan || dataKartuUcapan.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#231c26]">
      {/* Pattern background */}
      <div
        className="absolute inset-0 z-0 bg-repeat opacity-[0.03]"
        style={{
          backgroundImage: "url('/patern.png')",
          backgroundPosition: "center",
        }}
      />

      {/* Carousel */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={dataKartuUcapan.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="relative z-10 w-full kartu-ucapan-swiper"
      >
        {dataKartuUcapan.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full aspect-[16/6]">
              <img
                src={`/api/kartu-ucapan/image/${item.urlImage}`}
                alt={item.description || "Kartu Ucapan"}
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .kartu-ucapan-swiper .swiper-button-next,
        .kartu-ucapan-swiper .swiper-button-prev {
          width: 42px;
          height: 42px;
          border-radius: 9999px;
          background: rgba(0, 0, 0, 0.45);
          color: #f59e0b;
          transition: all 0.2s ease;
        }

        .kartu-ucapan-swiper .swiper-button-next:hover,
        .kartu-ucapan-swiper .swiper-button-prev:hover {
          background: #f59e0b;
          color: #231c26;
        }

        .kartu-ucapan-swiper .swiper-button-next::after,
        .kartu-ucapan-swiper .swiper-button-prev::after {
          font-size: 18px;
          font-weight: 700;
        }

        .kartu-ucapan-swiper .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.5;
        }

        .kartu-ucapan-swiper .swiper-pagination-bullet-active {
          background: #f59e0b;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default KartuUcapan;