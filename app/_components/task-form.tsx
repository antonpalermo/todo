"use client";

import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useModal from "@/lib/hooks/useModal";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface ITask {
  name: string;
}

export default function TaskForm() {
  const { toast } = useToast();
  const { toggle } = useModal();

  const router = useRouter();
  const form = useForm<ITask>({ defaultValues: { name: "" } });

  async function submit(value: ITask) {
    try {
      await axios.post("/api/tasks/create", value);
      toast({
        title: "Task successfully created."
      });
      toggle();
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error.response?.data.errors;
        errors.map((e: any) => form.setError(e.field, { message: e.message }));
      }
    }
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
