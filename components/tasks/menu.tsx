import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

import { ReactNode, forwardRef } from "react";
import Modal from "../modal";
import DeleteModal from "./modals/delete";

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

export default function Menu() {
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
            <Modal.Header title="Edit task" />
            Edit selected task.
            <Modal.Footer className="space-x-3">
              <Modal.Close asChild>
                <Button variant="ghost">Cancel</Button>
              </Modal.Close>
              <Button variant="destructive">Yes</Button>
            </Modal.Footer>
          </Modal.Content>
        </DropdownMenuDialogItem>
        <DropdownMenuDialogItem triggerChildren="Delete">
          <DeleteModal />
        </DropdownMenuDialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
