import { Avatar, Menu, Text } from "@mantine/core";
import { CiSettings } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { FcOrganization } from "react-icons/fc";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import SecureLS from "secure-ls";

const TopNav = () => {
  const ls = new SecureLS({ encodingType: "aes", isCompression: false });
  const handleLogout = () => {
    ls.clear();
    window.location.reload();
  };
  return (
    <div className="h-[50px] px-4 bg-[#344C9E] shadow-sm justify-end flex items-center">
      <Menu position="bottom" shadow="xl" withArrow offset={4}>
        <Menu.Target>
          <Avatar className="bg-white">
            <FaUserAlt size={20} />
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label className="flex gap-3 border-b border-b-gray-200 px-4 py-3">
            <Avatar color="cyan" className="size-10" radius="xl">
              RK
            </Avatar>
            <div className="flex flex-col">
              <Text c="gray.9" fw={600} size="sm" lh={"20px"}>
                Rojil Kusma
              </Text>
              <Text c="gray.8" fw={400} lh="20px" size="sm">
                rojilkusmadt@gmail.com
              </Text>
            </div>
          </Menu.Label>
          <div className="border-b border-b-gray-200">
            <Menu.Item leftSection={<FaUserAlt size={16} />}>
              View Profile
            </Menu.Item>
            <Menu.Item leftSection={<FcOrganization size={16} />}>
              Switch Organization
            </Menu.Item>
            <Menu.Item leftSection={<CiSettings size={16} />}>
              Settings
            </Menu.Item>
            <Menu.Item leftSection={<IoIosHelpCircleOutline size={16} />}>
              Help center
            </Menu.Item>
          </div>
          <Menu.Item
            leftSection={<RiLogoutBoxLine size={16} />}
            onClick={handleLogout}
          >
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default TopNav;
