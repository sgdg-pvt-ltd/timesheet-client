import { Button, Modal, Text, TextInput } from "@mantine/core";
import React from "react";
import { BiCross } from "react-icons/bi";
import { GoOrganization } from "react-icons/go";
import { z } from "zod";
import { ControlledField, useRHForm } from "~/components/form";
import { useDisclosure } from "~/hooks/useDisclosure";

const AddOrganization = () => {
  const [opened, { open, close }] = useDisclosure();
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
    console.log(data);
  };
  return (
    <>
      <Button color="#344C9E" onClick={open}>
        New Organization
      </Button>
      <Modal.Root opened={opened} onClose={close} centered>
        <Modal.Overlay onClick={close} />
        <Modal.Content>
          <Modal.Body className="flex flex-col p-6">
            <div className="flex w-full gap-4">
              <div className="flex size-8 items-center justify-center rounded-3xl bg-primary-100 p-2">
                <GoOrganization size={30} />
              </div>
              <div className="flex w-full flex-col">
                <div className="flex justify-between ">
                  <Text
                    className={`w-full`}
                    fw={600}
                    fz={"20px"}
                    lh={"28px"}
                    c={"gray.11"}
                  >
                    Create New Organization
                  </Text>
                  <BiCross onClick={close} className="cursor-pointer" />
                </div>
                <Text size="sm" fw={400} fz="14px" lh={"20px"} c={"gray.8"}>
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
                color="primary.0"
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
