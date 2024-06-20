import { gql, useMutation } from "@apollo/client";

const ADD_ORGANIZATION = gql`
  mutation CreateOrganization(
    $createOrganizationDto: CreateOrganizationDto!
    $adminId: String!
  ) {
    createOrganization(
      createOrganizationDto: $createOrganizationDto
      adminId: $adminId
    ) {
      id
    }
  }
`;

export const useCreateOrganization = (close?: () => void) => {
  const [addOrganization, { data, error, loading }] = useMutation(
    ADD_ORGANIZATION,
    {
      onCompleted: (res) => {
        console.log(res);
        close && close();
      },
      onError: (err) => {
        console.log(err);
      },
      update: (cache, { data }) => {
        if (data) {
          cache.modify({
            fields: {
              organizations: () => {
                //
              },
            },
          });
        }
      },
    }
  );
  const createOrganization = (input) => {
    addOrganization({
      variables: input,
    });
  };
  return {
    data,
    error,
    loading,
    createOrganization,
  };
};
