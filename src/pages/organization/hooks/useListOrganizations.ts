import { gql, useQuery } from "@apollo/client";

const LIST_ORGANIZATIONS = gql`
  query GetOrganizationsWithUsers {
    getOrganizationsWithUsers {
      organizationName
      userDetails {
        email
        role
        createdAt
        updatedAt
      }
      createdAt
      organizationId
      updatedAt
    }
  }
`;

export const useListOrganizations = () => {
  const { data, loading, error } = useQuery(LIST_ORGANIZATIONS, {
    //    onCompleted: () => {

    //     }
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    data: data?.getOrganizationsWithUsers,
    loading,
    error,
  };
};
