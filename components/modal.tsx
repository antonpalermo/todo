import { ReactNode } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function Modal({
  open,
  onOpenChange,
  children
}: {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
}

function ModalHeader({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <DialogHeader>
      <DialogTitle className="font-semibold">{title}</DialogTitle>
      {description && <DialogDescription>{description}</DialogDescription>}
    </DialogHeader>
  );
}

Modal.Close = DialogClose;
Modal.Header = ModalHeader;
Modal.Footer = DialogFooter;
Modal.Button = DialogTrigger;
Modal.Content = DialogContent;
