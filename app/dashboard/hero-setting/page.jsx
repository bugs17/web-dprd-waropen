import HeroSettings from "@/components/custom/client-component/hero-settings";



export const generateMetadata = () => {
    return {
        title: 'Pengaturan Hero | DPRK WAROPEN',
    };
};

const HeroSettingPage = () => {
  return (
    <div>
        <HeroSettings />
    </div>
  )
}

export default HeroSettingPage