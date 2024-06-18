import { BsGraphUp } from "react-icons/bs";
import {
  FaChartSimple,
  FaClipboardList,
  FaHandshake,
  FaPaperPlane,
  FaUser,
} from "react-icons/fa6";
import { IoBriefcaseSharp } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbLayoutDashboardFilled } from "react-icons/tb";

export const mockdata = [
  {
    label: "Dashboard",
    icon: <TbLayoutDashboardFilled size={20} />,
    path: "dashboard",
  },
  {
    label: "Client",
    icon: <FaHandshake size={20} />,
    path: "client",
  },
  {
    label: "Project",
    icon: <IoBriefcaseSharp size={20} />,
    path: "project",
  },
  {
    label: "Users",
    icon: <FaUser size={20} />,
    path: "users",
  },
  {
    label: "Tasks",
    icon: <FaClipboardList size={20} />,
    path: "tasks",
  },
  {
    label: "Reports",
    icon: <BsGraphUp size={20} />,
    children: [
      { label: "Weekly", path: "reports/weekly", icon: "" },
      { label: "Monthly", path: "reports/monthly", icon: "" },
      { label: "Quarterly", path: "reports/quarterly", icon: "" },
      { label: "Annually", path: "reports/annually", icon: "" },
    ],
  },
  { label: "RFI", icon: <FaPaperPlane size={20} />, path: "rfi" },
  { label: "Variation", icon: <FaChartSimple size={20} />, path: "variation" },
  {
    label: "Finances",
    icon: <RiMoneyDollarCircleLine size={20} />,
    path: "finances",
  },
];
