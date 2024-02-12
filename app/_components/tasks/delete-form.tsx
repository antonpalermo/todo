"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteTask } from "@/lib/actions/task";
import { useFormState, useFormStatus } from "react-dom";

type DeleteTaskProps = {
  id: string;
};

function DeleteTaskSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      Delete
    </Button>
  );
}

export default function DeleteTask({ id }: DeleteTaskProps) {
  const [state, formAction] = useFormState(deleteTask, null);

  return (
    <form action={formAction}>
      <Input type="hidden" name="id" value={id} />
      <DeleteTaskSubmitButton />
    </form>
  );
}
