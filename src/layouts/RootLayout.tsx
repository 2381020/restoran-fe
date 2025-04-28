import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-[#FFF8F0] p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
