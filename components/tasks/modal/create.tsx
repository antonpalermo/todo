import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import TaskForm from "../form";
import { Task } from "@prisma/client";
import { FormBadRequestError } from "@/lib/errors";
import { useRouter } from "next/navigation";

export default function CreateModal() {
  const router = useRouter();

  async function handleSubmit(data: Pick<Task, "name">) {
    const request = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(data)
    });

    if (request.status === 400) {
      const { errors } = await request.json();
      throw new FormBadRequestError("Form contains invalid fields", errors);
    }

    router.refresh();
  }

  return (
    <Modal>
      <Modal.Button asChild>
        <Button>Create</Button>
      </Modal.Button>
      <Modal.Content>
        <Modal.Header title="Create task" description="Create new task" />
        <TaskForm action="create" onSubmit={handleSubmit} />
      </Modal.Content>
    </Modal>
  );
}
