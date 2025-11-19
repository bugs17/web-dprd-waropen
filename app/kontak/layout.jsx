import BroadcumCustom from "@/components/custom/client-component/broadcump-custom"



export const generateMetadata = () => {
    return {
        title: 'Kontak | DPRK WAROPEN',
    };
};

const KontakLayout = ({children}) => {
  return (
    <div>
        <BroadcumCustom />
        {children}
    </div>
  )
}

export default KontakLayout