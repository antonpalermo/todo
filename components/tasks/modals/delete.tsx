"use client";

import { Button } from "@/components/ui/button";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { useTaskStore } from "@/lib/stores/task";

export default function DeleteModal() {
  const router = useRouter();
  const selectedTask = useTaskStore(state => state.selectedTask);

  async function handleDeleteRequest() {
    const request = await fetch(`/api/tasks/${selectedTask}`, {
      method: "DELETE"
    });

    if (!request.ok) {
      console.log("delete error");
    }

    console.log(await request.json());
    router.refresh();
  }

  return (
    <Modal.Content>
      <Modal.Header title="Delete Task" />
      <Modal.Footer>
        <Modal.Close asChild>
          <Button variant="ghost">Cancel</Button>
        </Modal.Close>
        <Button variant="destructive" onClick={() => handleDeleteRequest()}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
}
