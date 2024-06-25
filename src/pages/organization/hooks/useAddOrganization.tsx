import { gql, useMutation } from "@apollo/client";
import { notifications } from "@mantine/notifications";
import { CiCircleCheck } from "react-icons/ci";

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
        notifications.show({
          id: "org-success",
          withCloseButton: true,
          autoClose: 5000,
          // title: "You've been compromised",
          message: "Organization created successfully",
          color: "green",
          icon: <CiCircleCheck />,
          loading: false,
        });
        close && close();
      },
      onError: (err) => {
        notifications.show({
          id: "org-error",
          withCloseButton: true,
          autoClose: 5000,
          // title: "You've been compromised",
          message: err.message,
          color: "red",
          icon: <CiCircleCheck />,
          loading: false,
        });
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
