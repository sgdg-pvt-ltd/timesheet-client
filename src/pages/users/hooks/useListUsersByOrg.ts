import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

const GET_USERS_BY_ID = gql`
  query GetSingleOrganizationWithUser($organizationId: String!) {
    getSingleOrganizationWithUser(organizationId: $organizationId) {
      userDetails {
        email
        createdAt
      }
      organizationName
    }
  }
`;

export const useGetUsersByOrg = (id?: string | null) => {
  const [getUsers, { data, loading, error }] = useLazyQuery(GET_USERS_BY_ID, {
    onError: (err) => {
      console.log(err);
    },
  });
  useEffect(() => {
    if (id)
      getUsers({
        variables: {
          organizationId: id,
        },
      });
  }, [id]);
  return {
    data: data?.getSingleOrganizationWithUser,
    loading,
    error,
  };
};
