"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useModal from "@/lib/hooks/useModal";
import { useForm } from "react-hook-form";

interface ITask {
  name: string;
}

export default function TaskForm() {
  const { toggle } = useModal();
  const form = useForm<ITask>({ defaultValues: { name: "" } });

  async function submit(value: ITask) {
    console.log(value);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="flex flex-col space-y-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Buy some apples."
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end space-x-3">
          <Button variant={"ghost"} onClick={toggle}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
}
