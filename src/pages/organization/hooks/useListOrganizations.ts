import { gql, useQuery } from "@apollo/client";

const LIST_ORGANIZATIONS = gql`
  query Organizations {
    organizations {
      id
      name
      users {
        id

        email

        role
      }
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
    data: data?.organizations,
    loading,
    error,
  };
};
