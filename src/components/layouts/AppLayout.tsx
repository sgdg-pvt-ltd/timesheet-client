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
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main p="md" mt={0} mb={0} ml={300} mr={0}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
export default memo(AppLayout);
