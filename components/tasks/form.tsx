import { Task } from "@prisma/client";
import { useForm } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "../modal";
import { FormBadRequestError } from "@/lib/errors";

type FormTypes = Pick<Task, "name"> & {};

type TaskFormProps = {
  defaultValues?: { name: any };
  action: "create" | "update";
  onSubmit: (value: FormTypes) => Promise<void>;
};

export default function TaskForm({
  action,
  onSubmit,
  defaultValues
}: TaskFormProps) {
  const form = useForm<FormTypes>({
    defaultValues
  });

  async function handleOnSubmit(data: FormTypes) {
    try {
      await onSubmit(data);
    } catch (error: unknown) {
      if (error instanceof FormBadRequestError) {
        error.errors.map(error =>
          // TODO: since we are only using one fields for this form
          // we can hack it by passing the name to setError function
          // safly.

          // If multiple fields we need to change this "name" to the return
          form.setError(error.field, { message: error.message })
        );
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          id="task-form"
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Learn how to dance!" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Modal.Footer className="space-x-5">
        <Modal.Close asChild>
          <Button variant="ghost">Cancel</Button>
        </Modal.Close>
        <Button
          type="submit"
          form="task-form"
          disabled={form.formState.isSubmitting}
        >
          {action === "create" ? "Create" : "Update"}
        </Button>
      </Modal.Footer>
    </>
  );
}
