import { Group, ScrollArea, NavLink, Title } from "@mantine/core";

import { useState } from "react";
import { mockdata } from "./menuItems";
import { useNavigate } from "react-router-dom";

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
          //   rightSection={item.rightSection}
          //   leftSection={<item.icon size="1rem" stroke={1.5} />}
        >
          {item?.children?.map((child, idx) => {
            return (
              <NavLink
                key={child.label}
                active={idx === active.child}
                label={child.label}
                //   rightSection={item.rightSection}
                //   leftSection={<item.icon size="1rem" stroke={1.5} />}
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
          //   rightSection={item.rightSection}
          //   leftSection={<item.icon size="1rem" stroke={1.5} />}
          onClick={() => handleClick(index, item.path, "parent")}
        />
      );
  });

  return (
    <div className="flex flex-col gap-4">
      <Title order={2}>SG Design Nepal</Title>
      <ScrollArea>{links}</ScrollArea>;
    </div>
  );
}

export default Sidebar;
