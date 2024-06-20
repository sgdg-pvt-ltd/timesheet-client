import { Button, CloseIcon, Modal, Text, TextInput } from "@mantine/core";
import { GoOrganization } from "react-icons/go";
import { z } from "zod";
import { ControlledField, useRHForm } from "~/components/form";
import { useDisclosure } from "@mantine/hooks";
import { useCreateOrganization } from "../hooks/useAddOrganization";
import useAuthStore from "~/store/AuthStore";

const AddOrganization = () => {
  const [opened, { open, close }] = useDisclosure();
  const { createOrganization } = useCreateOrganization(close);
  const { authUser } = useAuthStore();
  const {
    Form,
    methods: {
      control,
      formState: { errors },
      //   watch,
      //   reset
    },
  } = useRHForm({
    initialValues: {},
    mode: "onSubmit",
    schema: z.object({
      name: z
        .string({ required_error: "Group Name is required." })
        .min(1, "Group Name is required."),
    }),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    const payload = {
      createOrganizationDto: {
        name: data.name,
      },
      adminId: authUser.id,
    };
    createOrganization(payload);
  };
  return (
    <>
      <Button color="#344C9E" onClick={open}>
        New Organization
      </Button>

      <Modal.Root opened={opened} onClose={close} centered radius="md">
        {/* Modal content */}
        <Modal.Overlay onClick={close} />
        <Modal.Content>
          <Modal.Body className="flex flex-col p-6">
            <div className="flex w-full items-center gap-4">
              <GoOrganization size={30} />
              <div className="flex w-full flex-col">
                <div className="flex justify-between ">
                  <Text className={`w-full`} fw={600} fz={"20px"} lh={"28px"}>
                    Create New Organization
                  </Text>
                  <CloseIcon
                    size="20"
                    onClick={close}
                    className="cursor-pointer"
                  />
                </div>
                <Text size="sm" fw={400} fz="14px" lh={"20px"}>
                  Enter the details of the organization to create.
                </Text>
              </div>
            </div>
            <Form
              formId="organizationModal"
              onSubmit={handleSubmit}
              className="mt-5 flex  flex-col gap-8"
            >
              <ControlledField
                control={control}
                name="name"
                label="name"
                required={true}
                Component={TextInput}
                componentProps={{
                  label: "Organization Name (needs to be Unique)",
                  placeholder: "Enter name",
                  error: errors.name?.message,
                  //   withAsterisk: true
                }}
              />
              <Button
                type="submit"
                form="organizationModal"
                fullWidth
                className="mt-1"
                //   loading={}
                color="#344C9E"
                variant="filled"
              >
                Create Group
              </Button>
            </Form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default AddOrganization;
