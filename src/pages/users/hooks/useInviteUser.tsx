import { gql, useMutation } from "@apollo/client";
import { CloseIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CiCircleCheck } from "react-icons/ci";

const INVITE_USERS = gql`
  mutation InviteUser($createInvitationInput: CreateInvitationDto!) {
    inviteUser(createInvitationInput: $createInvitationInput) {
      invitation {
        id
        email
        organizationId
        role
      }
      token
    }
  }
`;

export const useInviteUser = (close?: () => void) => {
  const [inviteUser, { data, loading, error }] = useMutation(INVITE_USERS, {
    onCompleted: (res) => {
      notifications.show({
        id: "invite-success",
        withCloseButton: true,
        autoClose: 5000,
        // title: "You've been compromised",
        message: "Invitation sent successfully",
        color: "green",
        icon: <CiCircleCheck />,
        loading: false,
      });
      close && close();
    },
    onError: (err) => {
      notifications.show({
        id: "invite-error",
        withCloseButton: true,
        autoClose: 5000,
        // title: "You've been compromised",
        message: err.message,
        color: "red",
        icon: <CloseIcon />,
        loading: false,
      });
    },
    update: (cache, { data }) => {
      if (data) {
        cache.modify({
          fields: {
            getSingleOrganizationWithUser: () => {
              //
            },
          },
        });
      }
    },
  });

  const sendInvitation = (input) => {
    inviteUser({
      variables: input,
    });
  };
  return {
    sendInvitation,
    data,
    loading,
    error,
  };
};
