import { Badge, Pagination, ScrollArea, Table } from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";
import styles from "./styles.module.css";

const UserTable = ({ data }: { data?: any }) => {
  const getBadgeColor = (role: string) => {
    switch (role) {
      case "Super Admin": {
        return "red";
      }
      case "Master Admin": {
        return "grape";
      }
      case "Unit Admin": {
        return "cyan";
      }
      case "Member": {
        return "orange";
      }
    }
  };
  const rows = data?.map((dtx) => (
    <Table.Tr key={dtx.email}>
      {/* <Table.Td>{dtx.name}</Table.Td> */}
      <Table.Td>{dtx.email}</Table.Td>
      {/* <Table.Td>
        <Badge
          tt={"capitalize"}
          variant="filled"
          color={getBadgeColor(dtx.role)}
        >
          {dtx.role}
        </Badge>
      </Table.Td> */}
      <Table.Td>{new Date(dtx.createdAt)?.toLocaleString()}</Table.Td>
      <Table.Td>
        <BsThreeDots size={24} className="cursor-pointer" />
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table stickyHeader className="h-full">
      <ScrollArea
        classNames={{
          root: styles.scroll,
          thumb: styles.thumb,
          scrollbar: styles.scrollbar,
          viewport: styles.viewport,
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {/* <Table.Th>Name</Table.Th> */}
            <Table.Th>Email</Table.Th>
            {/* <Table.Th>Role</Table.Th> */}
            <Table.Th>Joined Date</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </ScrollArea>
      <Table.Tfoot className="w-full">
        <Pagination total={1} classNames={styles} />
      </Table.Tfoot>
    </Table>
  );
};

export default UserTable;
