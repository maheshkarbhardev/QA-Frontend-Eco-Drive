import React from "react";
import { Outlet } from "react-router-dom";
import AppSideBar from "./AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
    <div className="min-h-screen">
      {/* Fixed left sidebar  */}

      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r">
        <AppSideBar />
      </aside>

      {/* Right side content changes with routings */}
      <main className="ml-64 flex flex-col w-[1280px] min-h-screen bg-gray-50">
        <div className="h-[63px] bg-gray-50"></div>
        <div className="p-10">
          <Outlet />
        </div>
      </main>
    </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
