"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import useModal from "@/lib/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";

export function CreateDialogTrigger() {
  const { toggle } = useModal();
  return <Button onClick={toggle}>Create</Button>;
}

export default function CreateDialog() {
  const { isOpen, toggle } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
          <DialogDescription>
            Ready for another one? Come on, let's do this!
          </DialogDescription>
        </DialogHeader>
        <div>sample</div>
      </DialogContent>
    </Dialog>
  );
}
