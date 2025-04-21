import AddTaskForm from "@/components/AddTaskForm";
import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";

export default function Task({ params }: { params: { id: number } }) {

  const { id } = params

  return (
    <div>
      <AddTaskForm />
    </div>
  );
}
