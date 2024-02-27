"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { modalStore } from "@/lib/stores/modal";

type Task = {
  name: "";
};

export default function TaskCreateForm() {
  const toggle = modalStore(state => state.toggle);
  const form = useForm<Task>({
    defaultValues: {
      name: ""
    }
  });

  async function onSubmit(data: Task) {
    const request = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(data)
    });

    const response = await request.json();

    if (request.status === 405) {
      console.log(response);
    }

    console.log(response);

    toggle(); // toggle modal state to close it.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  );
}
