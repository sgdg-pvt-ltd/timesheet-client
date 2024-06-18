import { Badge, Button, Card, Text } from "@mantine/core";

export const Organization = () => {
  return (
    <div className="h-full flex flex-col gap-6 ">
      <div className="flex justify-between w-2/3">
        <Text fz={"24px"} fw={600}>
          Organizations
        </Text>
        <Button>New Organization</Button>
      </div>
      <div className="flex w-2/3 flex-col h-full overflow-y-auto gap-5">
        {Array.from(Array(10).keys())?.map((item) => {
          return (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="cursor-pointer"
            >
              <div className="flex h-full justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Text>Organization {item + 1}</Text>
                  <Badge>Role {item + 1}</Badge>
                </div>
                <div className="flex items-center">icon</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
