import { Loader as Loading } from "@mantine/core";
export default function Loader() {
  return (
    <div className="flex items-center h-screen w-full justify-center">
      <Loading color="blue" />
    </div>
  );
}
