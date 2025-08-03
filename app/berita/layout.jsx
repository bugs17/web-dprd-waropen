import BroadcumCustom from "@/components/custom/client-component/broadcump-custom"

const LayoutBerita = ({children}) => {
  return (
    <div>
        <BroadcumCustom />
        
        {children}
    </div>
  )
}

export default LayoutBerita