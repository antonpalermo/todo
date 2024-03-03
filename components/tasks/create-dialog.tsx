"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription
} from "@/components/ui/dialog";
import { ModalAction, modalStore } from "@/lib/stores/modal";

import TaskCreateForm from "@/components/tasks/create-form";

export default function TaskCreateDialog() {
  const { isOpen, toggle, action } = modalStore(state => state);

  const formDescription = () => {
    if (action === "create") {
      return {
        heading: "Create new task",
        description: "Ready for another one? Come on, let's do this!"
      };
    }

    return {
      heading: "Update task",
      description: "I see your updating your task details."
    };
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => toggle(ModalAction.create)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{formDescription().heading}</DialogTitle>
          <DialogDescription>{formDescription().description}</DialogDescription>
        </DialogHeader>
        <TaskCreateForm />
      </DialogContent>
    </Dialog>
  );
}
