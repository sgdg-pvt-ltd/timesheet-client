import { InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // activityLogs: relayStylePagination(),
      },
    },
  },
});

export default cache;
