import ContactInfoCard from "@/components/custom/client-component/contactInfoCard"

export const generateMetadata = () => {
    return {
        title: 'Kontak & Alamat | DPRK WAROPEN',
    };
};

const KontakPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-10">Kontak & Sosial Media</h2>
      <ContactInfoCard />
    </div>
  )
}

export default KontakPage