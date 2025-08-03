import BroadcumCustom from "@/components/custom/client-component/broadcump-custom"

const DokumenLayout = ({children}) => {
  return (
    <div>
        <BroadcumCustom />
        
        {children}
    </div>
  )
}

export default DokumenLayout