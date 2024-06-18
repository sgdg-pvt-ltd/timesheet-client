import { NavLink as NLink } from "@mantine/core";
import classes from "./navlink.module.css";
const NavLink = (props) => {
  return (
    <NLink
      {...props}
      classNames={{
        root: classes.root,
        body: classes.body,
        label: classes.label,
      }}
    />
  );
};

export default NavLink;
