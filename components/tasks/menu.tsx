"use client";

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
import { ModalAction, modalStore } from "@/lib/stores/modal";
import { useRouter } from "next/navigation";

export default function TaskMenu({ id }: { id: string }) {
  const router = useRouter();
  const toggle = modalStore(state => state.toggle);

  async function deleteTask() {
    const request = await fetch(`/api/tasks/${id}`, {
      method: "DELETE"
    });

    if (!request.ok) {
      console.log("delete error");
    }

    console.log(await request.json());
    router.refresh();
  }

  return (
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
        <DropdownMenuItem onClick={() => deleteTask()}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
