"use client";

import { Task as _Task } from "@prisma/client";

import Menu from "./menu";

export type TaskProps = {
  task: _Task;
};

export default function Task({ task }: TaskProps) {
  return (
    <div className="border rounded px-3">
      <div className="py-2 flex flex-row items-center justify-between w-full">
        <h2>{task.name}</h2>
        <Menu />
      </div>
    </div>
  );
}
