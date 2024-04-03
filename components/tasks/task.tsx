"use client";

import { Task as _Task } from "@prisma/client";

import { Checkbox } from "@/components/ui/checkbox";

import Menu from "@/components/tasks/menu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export type TaskProps = {
  task: _Task;
};

export default function Task({ task }: TaskProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(task.isComplete);

  async function handleChecked() {
    try {
      const request = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ complete: !checked })
      });

      if (!request.ok) {
        // TODO: use toast here indicating that the requet failed.
      }

      setChecked(prev => !prev);
    } catch (error) {
      setChecked(false);
      console.log(error);
    }

    router.refresh();
  }

  return (
    <div className="border rounded px-3 bg-white">
      <div className="py-2 flex flex-row items-center justify-between w-full">
        <div className="inline-flex items-center justify-start space-x-3">
          <Checkbox checked={checked} onCheckedChange={() => handleChecked()} />
          <h2 className={cn(checked ? "line-through " : "")}>{task.name}</h2>
        </div>
        <Menu task={task} />
      </div>
    </div>
  );
}
