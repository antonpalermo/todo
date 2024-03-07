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

type FormTypes = Pick<Task, "name"> & {};

type TaskFormProps = {
  action: "create" | "update";
  onSubmit: (value: FormTypes) => Promise<void>;
};

export default function TaskForm({ action, onSubmit }: TaskFormProps) {
  const form = useForm<FormTypes>({
    defaultValues: {
      name: ""
    }
  });

  async function handleOnSubmit(data: FormTypes) {
    try {
      await onSubmit(data);
    } catch (error) {
      console.log("error from task form", error);
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
