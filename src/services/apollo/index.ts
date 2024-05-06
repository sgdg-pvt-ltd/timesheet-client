// import SecureLS from 'secure-ls';

import createUploadLink from "apollo-upload-client/createUploadLink.mjs"; // import { createHttpLink } from '@apollo/client/link/http';
// import { getMainDefinition } from '@apollo/client/utilities';

import { ApolloClient, from } from "@apollo/client";

// import { CONFIG } from '~/config';

import tokenRefresh from "./tokenRefresh";
import useErrorLink from "./errorLink";
import authLink from "./authLink";
import cache from "./cache";

// const ls = new SecureLS({ encodingType: 'aes', isCompression: false });
const uploadLink = createUploadLink({ uri: "CONFIG.API_ENDPOINT" });

// interface Definition {
// 	kind: string;
// 	operation?: string;
// }

function useApolloService() {
  // this is basically telling when to use http link and ws link
  // const defaultLink = split(
  // 	({ query }) => {
  // 		const { kind, operation }: Definition = getMainDefinition(query);
  // 		return kind === 'OperationDefinition' && operation === 'subscription';
  // 	},
  // 	// wsLink,
  // 	authLink.concat(uploadLink as unknown as ApolloLink),
  // );

  const { errorLink } = useErrorLink();

  const client = new ApolloClient({
    cache,
    connectToDevTools: true,
    link: from([tokenRefresh, errorLink, authLink, uploadLink]),
    defaultOptions: {
      watchQuery: {
        nextFetchPolicy(lastFetchPolicy) {
          if (
            lastFetchPolicy === "cache-and-network" ||
            lastFetchPolicy === "network-only"
          ) {
            return "cache-first";
          }
          return lastFetchPolicy;
        },
      },
    },
  });

  return { client };
}

export default useApolloService;

export { cache };
