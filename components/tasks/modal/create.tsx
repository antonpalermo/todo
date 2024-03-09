import { Task } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FormBadRequestError } from "@/lib/errors";

import Modal from "@/components/modal";
import TaskForm from "@/components/tasks/form";

export default function CreateModal() {
  const router = useRouter();
  const [createModalState, setCreateModalState] = useState(false);

  async function handleSubmit(data: Pick<Task, "name">) {
    const request = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(data)
    });

    if (request.status === 400) {
      const { errors } = await request.json();
      throw new FormBadRequestError("Form contains invalid fields", errors);
    }

    setCreateModalState(false);
    router.refresh();
  }

  return (
    <Modal open={createModalState} onOpenChange={setCreateModalState}>
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
