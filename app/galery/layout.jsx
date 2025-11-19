import BroadcumCustom from "@/components/custom/client-component/broadcump-custom"

export const generateMetadata = () => {
    return {
        title: 'Galery | DPRK WAROPEN',
    };
};

const GaleryLayout = ({children}) => {
  return (
    <div>
        <BroadcumCustom />
        
        {children}
    </div>
  )
}

export default GaleryLayout