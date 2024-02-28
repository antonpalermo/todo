"use client";

import { Task as _Task } from "@prisma/client";
import { useEffect, useState } from "react";

import TaskMenu from "@/components/tasks/menu";

export type TaskProps = {
  task: _Task;
};

export default function Task({ task }: TaskProps) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return null;
  }

  return (
    <div className="border rounded px-3">
      <div className="py-2 flex flex-row items-center justify-between w-full">
        <h2>{task.name}</h2>
        <TaskMenu />
      </div>
    </div>
  );
}
