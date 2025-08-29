import { DashboardNavbar, DashboardSidebar } from "../components";

const DashboardLayout = ({ children, isSettings }) => {
  return (
    <main className="bg-[#f9fafb] relative h-screen w-screen grid grid-cols-12">
      <DashboardSidebar />
      <div className="h-screen col-span-12 overflow-hidden lg:col-start-4 lg:col-span-9 pb-14">
        <DashboardNavbar />
        <div
          className={`${
            !isSettings ? "pl-3.5 md:pl-9 lg:pl-16 pt-10" : "pt-0"
          } overflow-y-scroll h-full hideScrollbar`}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
