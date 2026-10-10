"use client";

import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';

import { useEffect, useState } from 'react';
import { Loader, Film } from 'lucide-react';
import { getGalery } from '@/action/get-galery-data';

const GalleryCustom = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const newData = await getGalery();
            if (newData) {
                setData(newData);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const isVideoFile = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
        return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
    };

    return (
        <div className="px-2 lg:px-4 py-6 justify-center flex">
            {loading ? (
                <Loader className="text-amber-500 animate-spin w-8 h-8" />
            ) : (
                <LightGallery
                    speed={500}
                    plugins={[lgThumbnail, lgZoom, lgVideo]}
                    elementClassNames="flex flex-wrap gap-2 lg:gap-4 justify-center"
                >
                    {data.map((item, i) => {
                        const isVideo = isVideoFile(item.imageUrl);
                        const fileUrl = `/api/galery/image/${item.imageUrl}`;
                        const hasThumbnail = item.thumbnail && item.thumbnail !== "-";
                        const thumbSrc = hasThumbnail 
                            ? `/api/galery/image/${item.thumbnail}` 
                            : fileUrl;

                        // Konfigurasi objek JSON khusus untuk lg-video agar dijalankan sebagai HTML5 video player
                        const videoConfig = isVideo ? JSON.stringify({
                            source: [{ src: fileUrl, type: 'video/mp4' }],
                            attributes: { preload: 'auto', controls: true, playsinline: true }
                        }) : null;

                        return (
                            <a
                                key={i}
                                {...(isVideo 
                                    ? { 
                                        "data-video": videoConfig,
                                        "data-poster": hasThumbnail ? thumbSrc : undefined
                                      } 
                                    : { "data-src": fileUrl }
                                )}
                                className="relative w-40 lg:w-80 h-40 lg:h-56 rounded-lg shadow overflow-hidden group bg-zinc-900 flex items-center justify-center cursor-pointer"
                            >
                                {isVideo ? (
                                    hasThumbnail ? (
                                        <img
                                            alt={item.judul || "Video Thumbnail"}
                                            src={thumbSrc}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                            <video
                                                src={fileUrl}
                                                className="w-full h-full object-cover opacity-60"
                                                muted
                                                preload="metadata"
                                            />
                                        </div>
                                    )
                                ) : (
                                    <img
                                        alt={item.judul || "Gallery Image"}
                                        src={fileUrl}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}

                                {isVideo && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                                        <div className="bg-amber-500/90 p-3 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
                                            <Film className="w-6 h-6" />
                                        </div>
                                    </div>
                                )}

                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 py-2 z-10">
                                    <p className="text-white text-sm font-medium truncate">
                                        {item.judul || item.title}
                                    </p>
                                </div>
                            </a>
                        );
                    })}
                </LightGallery>
            )}
        </div>
    );
};

export default GalleryCustom;