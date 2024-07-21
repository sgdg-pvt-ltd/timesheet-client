import { createTheme } from "@mantine/core";

import { CustomTable } from "./table/table";

export const theme = createTheme({
  components: {
    Table: CustomTable,
  },
});
