"use client";
import { Task } from "@prisma/client";
import { useState } from "react";

import UpdateTask from "./update-form";
import DeleteTask from "./delete-form";

import { Button } from "@/components/ui/button";

type TaskProps = {
  task: Task;
};

export default function Task({ task }: TaskProps) {
  const [edit, setEdit] = useState(false);

  return (
    <div>
      {edit ? (
        <UpdateTask id={task.id} name={task.name} />
      ) : (
        <h2>{task.name}</h2>
      )}
      <Button onClick={() => setEdit(prev => !prev)}>Update</Button>
      <DeleteTask id={task.id} />
    </div>
  );
}
