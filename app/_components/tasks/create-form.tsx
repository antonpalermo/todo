"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { createTask, TaskStateAction } from "@/lib/actions/task";

function TaskFormSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      Create
    </Button>
  );
}

export default function TaskForm() {
  const [state, formAction] = useFormState(createTask, null);

  return (
    <form action={formAction}>
      <div>
        <Label>Name</Label>
        <Input name="name" placeholder="Buy some apples." autoComplete="off" />
      </div>
      <TaskFormSubmitButton />
    </form>
  );
}
