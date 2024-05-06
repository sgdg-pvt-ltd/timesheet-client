import { Text } from "@mantine/core";
import { memo } from "react";

const ErrorLabel = (props) => {
  return (
    <Text
      className="text-sm leading-5"
      c="#F04438"
      tt="capitalize"
      {...props}
    />
  );
};
export default memo(ErrorLabel);
