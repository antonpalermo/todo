"use client";

import { Task } from "@prisma/client";
import { forwardRef } from "react";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useTaskStore } from "@/lib/stores/task";
import { ModalAction, modalStore } from "@/lib/stores/modal";

import DeleteModal from "@/components/tasks/modals/delete";
import Modal from "../modal";
import { useRouter } from "next/navigation";

export default function TaskMenu({ task }: { task: Task }) {
  const router = useRouter();

  const toggle = modalStore(state => state.toggle);
  const onSelectTask = useTaskStore(state => state.onSelectTask);

  async function handleDeleteRequest() {
    const request = await fetch(`/api/tasks/${task.id}`, {
      method: "DELETE"
    });

    if (!request.ok) {
      console.log("delete error");
    }

    console.log(await request.json());
    router.refresh();
  }

  return (
    <Modal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => toggle(ModalAction.update)}>
            Edit
          </DropdownMenuItem>
          <Modal.Button asChild onClick={() => onSelectTask(task.id)}>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </Modal.Button>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Content>
        <Modal.Header title="Delete Task?" />
        Are you sure you want to delete this task?
        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="ghost">Cancel</Button>
          </Modal.Close>
          <Button variant="destructive" onClick={() => handleDeleteRequest()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
