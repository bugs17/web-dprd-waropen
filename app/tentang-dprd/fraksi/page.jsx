import FraksiComponent from '@/components/custom/client-component/fraksi-card';
import FraksiSection from '@/components/custom/fraksi-section'
import HeaderPages from '@/components/custom/header-pages'

const FraksiPage = () => {

  const fraksiData = [
        {
            name: "Fraksi A",
            parties: [
            { name: "PDIP", logo: "/4.jpeg" },
            { name: "Demokrat", logo: "/4.jpeg" },
            { name: "Demokrat", logo: "/4.jpeg" },
            { name: "Demokrat", logo: "/4.jpeg" },
            { name: "Demokrat", logo: "/4.jpeg" },
            { name: "Demokrat", logo: "/4.jpeg" },
            { name: "Demokrat", logo: "/4.jpeg" },
            { name: "Demokrat", logo: "/4.jpeg" },
            { name: "Demokrat", logo: "/4.jpeg" },
            ],
            members: [
            { name: "Nama 1", role: "Ketua Fraksi", party: "PDIP" },
            { name: "Nama 2", role: "Wakil Ketua Fraksi", party: "Demokrat" },
            { name: "Nama 3", role: "Anggota Fraksi", party: "PDIP" },
            { name: "Nama 1", role: "Ketua Fraksi", party: "PDIP" },
            { name: "Nama 2", role: "Wakil Ketua Fraksi", party: "Demokrat" },
            { name: "Nama 3", role: "Anggota Fraksi", party: "PDIP" },
            { name: "Nama 1", role: "Ketua Fraksi", party: "PDIP" },
            { name: "Nama 2", role: "Wakil Ketua Fraksi", party: "Demokrat" },
            { name: "Nama 3", role: "Anggota Fraksi", party: "PDIP" },
            ],
        },
        {
            name: "Fraksi B",
            parties: [
            { name: "Golkar", logo: "/4.jpeg" },
            ],
            members: [
            { name: "Nama 4", role: "Ketua Fraksi", party: "Golkar" },
            { name: "Nama 5", role: "Anggota Fraksi", party: "Golkar" },
            ],
        },
    ];

  return (
    <>
        <HeaderPages title={"Fraksi-fraksi Dewan Perwakilan Rakyat Kabupaten Waropen"} />
        {/* <FraksiSection /> */}
        <FraksiComponent fraksiData={fraksiData} />
    </>
  )
}

export default FraksiPage