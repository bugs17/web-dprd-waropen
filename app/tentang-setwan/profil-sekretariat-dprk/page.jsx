import HeaderPages from "@/components/custom/header-pages"

const ProfilSekretariat = () => {
  return (
    <>
        <HeaderPages title={"Profil Sekretariat DPRK"} />
        <div className="lg:px-28 lg:text-xl flex flex-col gap-3">
            <p className="text-white text-left">
                Sekretariat Dewan Perkawilan Rakyat Kabupaten Waropen dipimpin oleh seorang Sekretaris Dewan yang secara teknis operasional berada dibawah dan bertanggung jawab kepada Pimpinan DPRK dan secara administratif bertanggung jawab kepada Bupati melalui Sekretaris Daerah.
            </p>
            <p className="text-white text-left">
                Sekretariat Dewan Perwakilan Rakyat Kabupaten yang selanjutnya disebut Sekretariat DPRK merupakan unsur pelayanan administrasi dan pemberian dukungan terhadap  tugas dan fungsi DPRK.
            </p>
            
            <p className="text-white text-left">
                Sekretariat DPRK mempunyai tugas menyelenggarakan administrasi kesekretariatan dan keuangan, mendukung pelaksanaan tugas dan fungsi DPRK serta menyediakan dan mengkoordinasikan tenaga ahli yang diperlukan oleh DPRK dalam melaksanakan hak dan fungsinya sesuai dengan kebutuhan.
            </p>
            <br/>
            <p className="text-white text-left">
                <span className="font-bold">Fungsi Sekretariat DPRK:</span>
            </p>
            <ol className="text-white text-left">
                <li>1. Menyelenggarakan administrasi kesekretariatan DPRK</li>
                <li>2. Penyelenggaraan administrasi keuangan DPRK</li>
                <li>3. Fasilitasi penyelenggaraan rapat DPRK</li>
                <li>4. Penyediaan dan pengoordinasian tenaga ahli yang diperlukan oleh DPRK</li>
            </ol>
            <br/>
        </div>
    </>
  )
}

export default ProfilSekretariat