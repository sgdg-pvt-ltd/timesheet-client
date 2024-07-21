import { Text, TextInput } from "@mantine/core";
import UserTable from "./components/UserTable";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUsersByOrg } from "./hooks/useListUsersByOrg";
import InviteUsers from "./components/InviteUsers";
import { BiArrowBack, BiSearch } from "react-icons/bi";
import { useListOrganizations } from "../organization/hooks/useListOrganizations";
import { useEffect, useState } from "react";

const Users = () => {
  const { id } = useParams();

  const { data, loading } = useGetUsersByOrg(id);
  const { data: userList } = useListOrganizations();
  const [userData, setUserData] = useState<any>([]);
  useEffect(() => {
    userList &&
      userData.length < 1 &&
      userList?.forEach(({ userDetails }) =>
        setUserData((prev) => [...prev, ...userDetails])
      );
  }, [userList]);

  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col gap-6 ">
      <div className="flex justify-between ">
        {id ? (
          <Text
            fz={"24px"}
            fw={600}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <BiArrowBack />
            Users
            <span>({data?.organizationName})</span>
          </Text>
        ) : (
          <Text fz={"24px"} fw={600}>
            Users
          </Text>
        )}
        <div className=" flex gap-4">
          <TextInput
            leftSection={<BiSearch />}
            placeholder="Search"
          ></TextInput>
          <InviteUsers id={id} />
        </div>
      </div>
      <div className="">
        <UserTable data={id ? data?.userDetails : userData} />
      </div>
    </div>
  );
};

export default Users;
