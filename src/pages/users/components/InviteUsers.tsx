import {
  Button,
  CloseIcon,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaUser } from "react-icons/fa";
import { z } from "zod";
import { ControlledField, useRHForm } from "~/components/form";
import { useInviteUser } from "../hooks/useInviteUser";
import { useListOrganizations } from "~/pages/organization/hooks/useListOrganizations";

const InviteUsers = ({ id }: { id?: string }) => {
  const [opened, { open, close }] = useDisclosure();
  const roleOptions = [
    // {
    //   label: "Master Admin",
    //   value: "masterAdmin",
    // },
    {
      label: "Unit Admin",
      value: "unitAdmin",
    },
    {
      label: "Member",
      value: "member",
    },
  ];
  const {
    Form,
    methods: {
      control,
      formState: { errors },
      //   watch,
      reset,
    },
  } = useRHForm({
    initialValues: {},
    mode: "onSubmit",
    schema: z.object({
      email: z
        .string({ required_error: "Email is required." })
        .email("Invalid email"),
      role: z
        .string({ required_error: "Must select a role" })
        .min(1, "Must select a role"),
      ...(!id && {
        organizationId: z
          .string({ required_error: "Must select a role" })
          .min(1, "Must select a role"),
      }),
    }),
  });
  const handleClose = () => {
    close();
    reset();
  };
  const { sendInvitation, loading } = useInviteUser(handleClose);
  const { data } = useListOrganizations();
  const organizationOptions = data?.map(
    ({ organizationName, organizationId }) => {
      return {
        label: organizationName,
        value: organizationId,
      };
    }
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    const payload = {
      createInvitationInput: {
        email: data?.email,
        organizationId: id ?? data?.organizationId,
        role: data?.role,
      },
    };
    sendInvitation(payload);
  };
  return (
    <>
      <Button variant="filled" onClick={open}>
        Invite new user
      </Button>

      <Modal.Root opened={opened} onClose={close} centered radius="md">
        {/* Modal content */}
        <Modal.Overlay onClick={close} />
        <Modal.Content>
          <Modal.Body className="flex flex-col p-6">
            <div className="flex w-full items-center gap-4">
              <FaUser size={30} />
              <div className="flex w-full flex-col">
                <div className="flex justify-between ">
                  <Text className={`w-full`} fw={600} fz={"20px"} lh={"28px"}>
                    Invite user
                  </Text>
                  <CloseIcon
                    size="20"
                    onClick={close}
                    className="cursor-pointer"
                  />
                </div>
                <Text size="sm" fw={400} fz="14px" lh={"20px"}>
                  Invite new user to this organization.
                </Text>
              </div>
            </div>
            <Form
              formId="organizationModal"
              onSubmit={handleSubmit}
              className="mt-5 flex  flex-col gap-2"
            >
              <ControlledField
                control={control}
                name="email"
                label="Email"
                required={true}
                Component={TextInput}
                componentProps={{
                  label: "Email (needs to be Unique)",
                  placeholder: "Enter email",
                  error: errors.email?.message,
                  //   withAsterisk: true
                }}
              />
              <ControlledField
                control={control}
                name="role"
                label="Role"
                required={true}
                Component={Select}
                componentProps={{
                  label: "Role",
                  placeholder: "Select role",
                  error: errors.role?.message,
                  data: roleOptions,
                }}
              />
              {!id && (
                <ControlledField
                  control={control}
                  name="organizationId"
                  label="Organization"
                  required={true}
                  Component={Select}
                  componentProps={{
                    label: "Organization",
                    placeholder: "Select organization",
                    error: errors.organizationId?.message,
                    data: organizationOptions,
                  }}
                />
              )}
              <Button
                type="submit"
                form="organizationModal"
                fullWidth
                className="mt-4"
                loading={loading}
                disabled={loading}
                color="#344C9E"
                variant="filled"
              >
                Invite
              </Button>
            </Form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default InviteUsers;
