"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription
} from "@/components/ui/dialog";
import { modalStore } from "@/lib/stores/modal";

import TaskCreateForm from "@/components/tasks/create-form";

export default function TaskCreateDialog() {
  const { isOpen, toggle } = modalStore(state => state);

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
          <DialogDescription>
            Ready for another one? Come on, let's do this!
          </DialogDescription>
        </DialogHeader>
        <TaskCreateForm />
      </DialogContent>
    </Dialog>
  );
}
