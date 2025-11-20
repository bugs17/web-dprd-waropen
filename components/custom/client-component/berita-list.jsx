"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Loader, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { truncateText } from "@/lib/trunc-kalimat";
import { formatTanggalIndo } from "@/lib/formatDate";
import { getBeritaInfinite } from "@/action/get-berita-infinite";

const LIMIT = 10;

export default function BeritaClient() {
    const [userScrolled, setUserScrolled] = useState(false);
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState("");
    const [beritas, setBeritas] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    
    const [initialLoaded, setInitialLoaded] = useState(false); // ⬅️ Tambahan

    // 🔸 Debounce (JS murni)
    const debounce = (fn, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    const handleSearch = useCallback(
        debounce(async (value) => {
            setSearching(true)
            setPage(1);
            const res = await getBeritaInfinite({ search: value, page: 1, limit: LIMIT });
            setBeritas(res);
            setHasMore(res.length === LIMIT);
            setInitialLoaded(true); // ⬅️ search juga dianggap load awal selesai
            setSearching(false);
        }, 500),
        []
    );

    const onSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value);
    };

    // 🔸 Load more (server action)
    const fetchMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const nextPage = page + 1;

        const res = await getBeritaInfinite({
            search: query,
            page: nextPage,
            limit: LIMIT,
        });

        setBeritas((prev) => [...prev, ...res]);
        setPage(nextPage);

        // Jika hasil < LIMIT → habis
        // Ini trigger munculnya "Tidak ada berita lagi"
        setHasMore(res.length === LIMIT);

        setLoading(false);
        setInitialLoaded(true); // ⬅️ Supaya indicator hanya muncul setelah scroll
    };

    // 🔸 Infinite scroll listener
    useEffect(() => {
        const onScroll = () => {
            if (!userScrolled) setUserScrolled(true);

            if (loading || !hasMore) return;

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
                fetchMore();
            }
        };


        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [loading, hasMore, page, query]);

    // 🔸 Load awal
    useEffect(() => {
        (async () => {
            const data = await getBeritaInfinite({ search: "", page: 1, limit: LIMIT });
            setBeritas(data);

            // ❗ Jangan tampilkan "Tidak ada berita lagi" meskipun data < LIMIT
            // karena ini load pertama
            setHasMore(data.length === LIMIT);

            setInitialLoaded(true); // ⬅️ Penanda load awal selesai
        })();
    }, []);

    return (
        <>
            {/* Search */}
            <div className="w-full mb-3 flex justify-center">
                <div className="relative lg:w-full max-w-sm">
                    <Input
                        type="text"
                        placeholder="Cari berita..."
                        className="pr-10 text-white"
                        value={query}
                        onChange={onSearchChange}
                    />
                    {searching ? (
                        <Loader className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 h-5 w-5" />
                    ):(
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white h-5 w-5" />
                    )}
                </div>
            </div>

            {/* List Berita */}
            <div className="flex flex-wrap w-full px-4 pb-6">
                {beritas.map((berita, index) => (
                    <Link
                        key={index}
                        href={`/berita/${berita.id}`}
                        className="w-full lg:w-1/3 h-60 p-4 overflow-hidden group"
                    >
                        <div className="relative w-full h-full overflow-hidden rounded-lg">
                            <Image
                                src={`/api/berita/image/${berita.imageUrl}`}
                                alt={berita.judul}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute bottom-0 left-0 w-full gap-3 flex flex-row items-center bg-gradient-to-t from-black/70 to-transparent p-4">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <h3 className="text-white text-lg font-semibold">
                                            {truncateText(berita.judul, 45)}
                                        </h3>
                                    </TooltipTrigger>
                                    <TooltipContent>{berita.judul}</TooltipContent>
                                </Tooltip>

                                <span className="text-white text-xs font-mono">
                                    {formatTanggalIndo(berita.createdAt)}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Loading */}
            {loading && (
                <p className="w-full text-center text-gray-300 py-4">Memuat...</p>
            )}

            {/* End */}
            {!hasMore && beritas.length > 0 && userScrolled && (
                <p className="w-full text-center text-gray-500 py-6">
                    Tidak ada berita lagi.
                </p>
            )}

        </>
    );
}
