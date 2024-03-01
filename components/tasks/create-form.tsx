"use client";

import { useForm } from "react-hook-form";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

    if (request.status === 400) {
      const errors = response.errors;
      if (typeof errors === "object" && Array.isArray(errors))
        errors.map(error =>
          form.setError(error.field, { message: error.message })
        );
      return;
    }

    toggle();
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
