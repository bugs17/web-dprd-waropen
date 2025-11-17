import { AppSidebar } from "@/components/app-sidebar"
import DigitalClock from "@/components/custom/client-component/clock";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AuthWrapper from "@/context/AuthProvider";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

export const generateMetadata = () => {
  return {
    title: 'Dashboard | DPRK WAROPEN',
  };
};

const DashboardLayout = ({children}) => {
  return (
    <ClerkProvider>
      <AuthWrapper>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header
                className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4 w-full">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                  <div className="ml-auto">
                      {/* <DigitalClock /> */}
                      <UserButton appearance={{
                        elements: {
                          userButtonText: "text-white", // bisa pakai tailwind class
                        },
                      }}
                      userProfileMode="modal"  />

                  </div>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
      </AuthWrapper>
    </ClerkProvider>
  )
}

export default DashboardLayout