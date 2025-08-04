"use client"

import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';


const GalleryCustom = () => {
  const onInit = () => {
        console.log('lightGallery has been initialized');
    };

    return (
        <div className="px-4 py-6 justify-center flex">
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="flex flex-wrap gap-4 justify-center"
            >
                {[
                    { src: "/tomlembong.jpeg", title: "Tom Lembong - Statement 1" },
                    { src: "/nau.jpg", title: "Pantau potensi wisata di pulau nau" },
                    { src: "/tomlembong.jpeg", title: "Tom Lembong - Statement 3" },
                    { src: "/tomlembong.jpeg", title: "Tom Lembong - Statement 4" },
                    { src: "/tomlembong.jpeg", title: "Tom Lembong - Statement 5" }
                ].map((item, i) => (
                    <a key={i} href={item.src} className="relative w-80 rounded shadow overflow-hidden group">
                    <img
                        alt={`img${i}`}
                        src={item.src}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                        <p className="text-white text-sm font-medium truncate">{item.title}</p>
                    </div>
                    </a>
                ))}
            </LightGallery>
        </div>

    );
}

export default GalleryCustom