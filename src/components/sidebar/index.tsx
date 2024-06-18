import { ScrollArea, Title } from "@mantine/core";

import { useState } from "react";
import { mockdata } from "./menuItems";
import { useNavigate } from "react-router-dom";
import NavLink from "../atomic/navlink/NavLink";

function Sidebar() {
  const navigate = useNavigate();
  const [active, setActive] = useState({
    parent: 0,
    child: 0,
  });

  const handleClick = (index, path, type) => {
    if (type === "parent") {
      setActive({
        parent: index,
        child: -1,
      });
    } else {
      setActive({
        parent: 5,
        child: index,
      });
    }
    navigate(`/app/${path}`);
  };
  const links = mockdata.map((item, index) => {
    if (item?.children?.length && item?.children?.length > 0) {
      return (
        <NavLink
          key={item.label}
          active={index === active.parent}
          label={item.label}
          leftSection={item.icon}
        >
          {item?.children?.map((child, idx) => {
            return (
              <NavLink
                key={child.label}
                active={idx === active.child}
                label={child.label}
                leftSection={child.icon}
                onClick={() => handleClick(idx, child.path, "child")}
              />
            );
          })}
        </NavLink>
      );
    } else
      return (
        <NavLink
          key={item.label}
          active={index === active.parent}
          label={item.label}
          leftSection={item.icon}
          onClick={() => handleClick(index, item.path, "parent")}
        />
      );
  });

  return (
    <div className="flex flex-col justify-between bg-[#344C9E] h-full p-4 text-white rounded-lg shadow-md">
      <div className="flex flex-col gap-4">
        <Title order={2}>SG Design Nepal</Title>
        <ScrollArea>{links}</ScrollArea>
      </div>
      <NavLink
        active={active.parent === 99}
        label={"Organization"}
        // leftSection={}
        onClick={() => handleClick(99, "organization", "parent")}
      />
    </div>
  );
}

export default Sidebar;
