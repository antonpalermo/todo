"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateTask } from "@/lib/actions/task";
import { useFormState, useFormStatus } from "react-dom";

type UpdateTaskProps = {
  id: string;
  name: string;
};

function UpdateTaskSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      Update
    </Button>
  );
}

export default function UpdateTask({ id, name }: UpdateTaskProps) {
  const [state, formAction] = useFormState(updateTask, null);

  return (
    <form action={formAction}>
      <Input type="hidden" name="id" value={id} />
      <Input type="text" name="name" />
      <UpdateTaskSubmitButton />
    </form>
  );
}
