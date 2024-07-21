import { Card, Menu, Text } from "@mantine/core";
import { useListOrganizations } from "./hooks/useListOrganizations";
import { BsThreeDots } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import AddOrganization from "./components/AddOrganization";
import { useNavigate } from "react-router-dom";

export const Organization = () => {
  const { data } = useListOrganizations();
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col gap-6 ">
      <div className="flex justify-between w-2/3">
        <Text fz={"24px"} fw={600}>
          Organizations
        </Text>
        <AddOrganization />
      </div>
      <div className="flex w-2/3 flex-col h-full overflow-y-auto gap-5">
        {data?.map((item) => {
          return (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className=""
              key={item?.organizationId}
            >
              <div className="flex h-full justify-between gap-4">
                <div className="flex items-center justify-between w-full gap-4">
                  <Text tt="capitalize">{item.organizationName}</Text>
                  <Text>
                    Created on: {new Date(item.createdAt)?.toLocaleString()}
                  </Text>
                </div>
                <div className="flex items-center">
                  <Menu
                    width={140}
                    position="bottom-end"
                    radius="md"
                    shadow="md"
                  >
                    <Menu.Target>
                      <button>
                        <BsThreeDots size={24} className="cursor-pointer" />
                      </button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<FaRegEye size={18} />}
                        onClick={() => navigate(item?.organizationId)}
                      >
                        View
                      </Menu.Item>
                      <Menu.Item leftSection={<CiEdit size={18} />}>
                        Edit
                      </Menu.Item>
                      <Menu.Item leftSection={<MdDeleteOutline size={18} />}>
                        Delete
                      </Menu.Item>
                      <Menu.Item leftSection={<RiLogoutBoxLine size={18} />}>
                        Leave
                      </Menu.Item>
                      <Menu.Item leftSection={<RiLogoutBoxLine size={18} />}>
                        Switch to this org
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
