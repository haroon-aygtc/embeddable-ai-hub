
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Toaster } from "sonner";

const AppLayout = () => {
  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container py-6">
          <Outlet />
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default AppLayout;
