import { Divider, ScrollArea, Text, Title } from "@mantine/core";

import { useState } from "react";
import { mockdata } from "./menuItems";
import { useLocation, useNavigate } from "react-router-dom";
import NavLink from "../atomic/navlink/NavLink";
import { UserIcon } from "~/assets/icons";
import { GoOrganization } from "react-icons/go";
function Sidebar() {
  const { pathname } = useLocation();
  const selectedMenu: string =
    pathname?.split("/")[2] ?? pathname?.split("/").pop() ?? "";
  const selectedChild =
    pathname?.split("/").pop() ?? pathname?.split("/")[2] ?? "";

  const navigate = useNavigate();

  const links = mockdata.map((item, index) => {
    if (item?.children?.length && item?.children?.length > 0) {
      return (
        <NavLink
          key={item.label}
          active={selectedMenu === item.path}
          label={item.label}
          leftSection={item.icon}
        >
          {item?.children?.map((child, idx) => {
            return (
              <NavLink
                key={child.label}
                active={selectedChild === child.label.toLowerCase()}
                label={child.label}
                leftSection={child.icon}
                onClick={() => navigate(child.path)}
              />
            );
          })}
        </NavLink>
      );
    } else
      return (
        <NavLink
          key={item.label}
          active={selectedMenu === item.path}
          label={item.label}
          leftSection={item.icon}
          onClick={() => navigate(item.path ?? "")}
        />
      );
  });

  return (
    <div className="flex flex-col justify-between bg-[#344C9E] h-full px-4 py-8 text-white">
      <div className="flex flex-col gap-4">
        <Title order={2} className="text-center">
          Logo
        </Title>

        <Divider />

        <ScrollArea>{links}</ScrollArea>
      </div>
      <NavLink
        active={selectedMenu === "organization"}
        label={"Organization"}
        leftSection={<GoOrganization size={20} />}
        onClick={() => navigate("organization")}
      />
    </div>
  );
}

export default Sidebar;
