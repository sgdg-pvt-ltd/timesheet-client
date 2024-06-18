import { AppShell } from "@mantine/core";
import { memo } from "react";
import Sidebar from "../sidebar";
import { Outlet } from "react-router-dom";
import TopNav from "../sidebar/TopNav";

const AppLayout = () => {
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      // padding="md"
    >
      <AppShell.Navbar
        p=""
        className=""
        style={{
          background: "rgba(0, 0, 0, 0.07)",
          border: "none",
        }}
      >
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main
        mt={0}
        mb={0}
        mr={0}
        style={{
          background: "rgba(0, 0, 0, 0.07)",
        }}
      >
        <TopNav />
        <div className="bg-white rounded-md p-5 max-h-[calc(100vh-82px)] m-4 h-[calc(100vh-82px)]">
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  );
};
export default memo(AppLayout);
