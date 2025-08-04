import BroadcumCustom from "@/components/custom/client-component/broadcump-custom"

const GaleryLayout = ({children}) => {
  return (
    <div>
        <BroadcumCustom />
        
        {children}
    </div>
  )
}

export default GaleryLayout