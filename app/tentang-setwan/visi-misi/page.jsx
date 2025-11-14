import HeaderPages from '@/components/custom/header-pages'


export const generateMetadata = () => {
    return {
        title: 'Visi-Misi | DPRK WAROPEN',
    };
};

const VisiMisiPage = () => {
  return (
    <>
        <HeaderPages title={"Visi dan Misi"} />
        <div className="lg:px-28 lg:text-xl flex flex-col gap-3">
            <p className="text-white text-left">
                Visi dan Misi Sekretariat Dewan Perwakilan Rakyat Daerah Kabupaten Waropen adalah sebagai berikut:
            </p>
            
            <span className='text-amber-300 text-left text-lg font-bold mt-5'>A. VISI</span>
            <p className="text-white text-left pl-20">
                "Terwujutnya Peningkatan Kinerja Sekretariat Dewan Perwakilan Rakyat Kabupaten Waropen Dalam Rangka Pelayanan Prima terhadap Fungsi dan Tugas Legislatif."
            </p>
            <span className='text-amber-300 text-left text-lg font-bold mt-5'>B. MISI</span>
            <p className="text-white text-left">
                Guna mewujutkan kondisi dalam visi, maka akan diwujutkan misi sebagai berikut:
            </p>
            <ol type="a" className="list-[lower-alpha] pl-6 space-y-4 text-white lg:pl-20">
                <li>
                    <p className="font-semibold">Meningkatkan kualitas Pelayanan Dan Kinerja Aparatur Dalam Aspek Teknis Maupun Administratif.</p>
                    <p className="mt-1">
                    Meningkatkan kualitas pelayanan dan kinerja aparatur dalam aspek teknis maupun administratif, mengandung makna bahwa dalam rangka untuk mendukung atau menunjang terlaksananya pelayanan terhadap fungsi dan kewenangan Legislatif, maka harus tersedia kualitas pelayanan administrasi maupun kinerja aparatur yang baik sehingga fungsi dan kewenangan Legislatif dapat terwujud sesuai dengan yang diharapkan.
                    </p>
                </li>
                <li>
                    <p className="font-semibold">Meningkatkan Penyediaan Fasilitas Pelayanan Guna Menunjang Fungsi dan Tugas Legislatif.</p>
                    <p className="mt-1">
                    Meningkatkan Penyediaan fasilitas Pelayanan Guna Menunjang fungsi dan tugas legislatif, mengandung makna bahwa dalam rangka untuk mendukung atau menunjang terlaksananya pelayanan prima maka diperlukan fasilitas baik sarana maupun prasarana yang mendukung terwujudnya fungsi dan tugas legislatif.
                    </p>
                </li>
                <li>
                    <p className="font-semibold">Meningkatkan Sumber Daya Aparatur Dalam Menunjang Fungsi dan kewenangan Legislatif.</p>
                    <p className="mt-1">
                    Meningkatkan sumber daya aparatur dalam menunjang fungsi dan kewenangan legislatif, mengandung makna bahwa dalam rangka meningkatkan sumber daya aparatur maka diperlukan pelatihan/bimbingan teknis tentang perundang-undangan sehingga mendukung terwujudnya fungsi dan tugas legislatif.
                    </p>
                </li>
                <li>
                    <p className="font-semibold">Meningkatkan Kapasitas Lembaga Perwakilan Rakyat Daerah.</p>
                    <p className="mt-1">
                    Meningkatkan Kapasitas Lembaga Perwakilan Rakyat Daerah, Mengandung makna bahwa dalam rangka untuk memperkuat peran politik lembaga perwakilan rakyat daerah.
                    </p>
                </li>
                </ol>
        </div>
    </>
  )
}

export default VisiMisiPage