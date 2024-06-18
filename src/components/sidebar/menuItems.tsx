import {
  BarIcon,
  BitCoinIcon,
  BriefCaseIcon,
  ClipBoardIcon,
  GraphIcon,
  HandShakeIcon,
  HomeIcon,
  PaperPlaneIcon,
  UserIcon,
} from "~/assets/icons";

export const mockdata = [
  { label: "Dashboard", icon: <HomeIcon />, path: "dashboard" },
  {
    label: "Client",
    icon: <HandShakeIcon />,
    path: "client",
  },
  {
    label: "Project",
    icon: <BriefCaseIcon />,
    path: "project",
  },
  {
    label: "Users",
    icon: <UserIcon />,
    path: "users",
  },
  {
    label: "Tasks",
    icon: <ClipBoardIcon />,
    path: "tasks",
  },
  {
    label: "Reports",
    icon: <GraphIcon />,
    children: [
      { label: "Weekly", path: "reports/weekly", icon: "" },
      { label: "Monthly", path: "reports/monthly", icon: "" },
      { label: "Quarterly", path: "reports/quarterly", icon: "" },
      { label: "Annually", path: "reports/annually", icon: "" },
    ],
  },
  { label: "RFI", icon: <PaperPlaneIcon />, path: "rfi" },
  { label: "Variation", icon: <BarIcon />, path: "variation" },
  { label: "Finances", icon: <BitCoinIcon />, path: "finances" },
];
