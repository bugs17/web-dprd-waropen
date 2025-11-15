"use client";

import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { getGalery } from '@/action/get-galery-data';

const GalleryCustom = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const newData = await getGalery();
            if (newData) {
                setData(newData); // cukup ini
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="px-2 lg:px-4 py-6 justify-center flex">
            {loading ? (
                <Loader className="text-amber-500 animate-spin w-8 h-8" />
            ) : (
                <LightGallery
                    speed={500}
                    plugins={[lgThumbnail, lgZoom]}
                    elementClassNames="flex flex-wrap gap-2 lg:gap-4 justify-center"
                >
                    {data.map((item, i) => (
                        <a
                            key={i}
                            href={`/api/galery/image/${item.imageUrl}`} // Lightbox dimulai dari ini
                            className="relative w-40 lg:w-80 rounded shadow overflow-hidden group"
                        >
                            <img
                                alt={item.judul}
                                src={`/api/galery/image/${item.imageUrl}`}
                                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                                <p className="text-white text-sm font-medium truncate">
                                    {item.title}
                                </p>
                            </div>
                        </a>
                    ))}
                </LightGallery>
            )}
        </div>
    );
};

export default GalleryCustom;
