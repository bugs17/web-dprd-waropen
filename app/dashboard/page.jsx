
const DashboardPage = () => {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col overflow-hidden" >
                <div className="w-full h-full gap-2 flex flex-col items-center justify-center">
                  <span className="font-bold text-4xl">😊👋</span>
                  <span className=" text-white">Hallo admin..</span>
                </div>
                
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col overflow-hidden" >
                <div className="w-full h-[80%] flex items-center justify-center">
                  <span className="font-bold text-8xl text-amber-400">12</span>
                </div>
                <div className="w-full h-[20%] flex items-center justify-center">
                  <span className="font-mono text-gray-400">Jumlah Produk Hukum</span>
                </div>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col overflow-hidden" >
                <div className="w-full h-[80%] flex items-center justify-center">
                  <span className="font-bold text-8xl text-amber-400">23</span>
                </div>
                <div className="w-full h-[20%] flex items-center justify-center">
                  <span className="font-mono text-gray-400">Jumlah Berita</span>
                </div>
            </div>
            
          </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </>
  )
}

export default DashboardPage
