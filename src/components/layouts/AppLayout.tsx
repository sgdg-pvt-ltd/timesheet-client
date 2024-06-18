import { AppShell } from "@mantine/core";
import { memo } from "react";
import Sidebar from "../sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Navbar
        p="md"
        className=""
        style={{
          background: "rgba(0, 0, 0, 0.07)",
          border: "none",
        }}
      >
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main
        p="md"
        mt={0}
        mb={0}
        ml={300}
        mr={0}
        style={{
          background: "rgba(0, 0, 0, 0.07)",
        }}
      >
        <div className="bg-white rounded-md p-5 max-h-[calc(100vh-32px)] h-[calc(100vh-32px)]">
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  );
};
export default memo(AppLayout);
