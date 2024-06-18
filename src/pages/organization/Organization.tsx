import { Badge, Button, Card, Menu, Text } from "@mantine/core";
import { useListOrganizations } from "./hooks/useListOrganizations";
import { BsThreeDots } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";

export const Organization = () => {
  const { data } = useListOrganizations();

  return (
    <div className="h-full flex flex-col gap-6 ">
      <div className="flex justify-between w-2/3">
        <Text fz={"24px"} fw={600}>
          Organizations
        </Text>
        <Button>New Organization</Button>
      </div>
      <div className="flex w-2/3 flex-col h-full overflow-y-auto gap-5">
        {data?.map((item) => {
          return (
            <Card shadow="sm" padding="lg" radius="md" withBorder className="">
              <div className="flex h-full justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Text tt="capitalize">{item.name}</Text>
                  <Badge>{item.users.length} users</Badge>
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
                      <Menu.Item leftSection={<FaRegEye size={18} />}>
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
