import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { ReactNode, forwardRef } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import Modal from "@/components/modal";
import TaskForm from "./form";

type MenuProps = {
  task: Task;
};

type DialogItemProps = {
  triggerChildren: string;
  children: ReactNode;
  onSelect?: (event?: Event) => void;
  onOpenChange?: (val: boolean) => void;
};

const DropdownMenuDialogItem = forwardRef<null, DialogItemProps>(
  (props, forwardedRef) => {
    const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
      props;
    return (
      <Modal onOpenChange={onOpenChange}>
        <Modal.Button asChild>
          <DropdownMenuItem
            {...itemProps}
            ref={forwardedRef}
            onSelect={event => {
              event.preventDefault();
              onSelect && onSelect();
            }}
          >
            {triggerChildren}
          </DropdownMenuItem>
        </Modal.Button>
        {children}
      </Modal>
    );
  }
);

export default function Menu({ task }: MenuProps) {
  const router = useRouter();

  async function deleteTask(id: string) {
    const request = await fetch(`/api/tasks/${id}`, {
      method: "DELETE"
    });

    if (!request.ok) {
      console.log("delete error");
    }

    router.refresh();
  }

  async function handUpdateTask(data: Pick<Task, "name">) {
    console.log(data);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuDialogItem triggerChildren="Edit">
          <Modal.Content>
            <Modal.Header title="Edit task" description="Edit selected task." />
            <TaskForm action="update" onSubmit={handUpdateTask} />
          </Modal.Content>
        </DropdownMenuDialogItem>
        <DropdownMenuDialogItem triggerChildren="Delete">
          <Modal.Content>
            <Modal.Header title="Delete selected task" />
            Are you sure you want to delete this task?
            <Modal.Footer>
              <Modal.Close asChild>
                <Button variant="ghost">Cancel</Button>
              </Modal.Close>
              <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </DropdownMenuDialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
