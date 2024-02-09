"use client";

import axios from "axios";

import { X } from "lucide-react";
import { Task } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();
  const { toast } = useToast();

  async function deleteTask() {
    try {
      axios.delete(`/api/tasks/${task.id}`);
      toast({
        title: "Task successfully deleted."
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="border rounded px-5 py-5">
      <div className="w-full inline-flex justify-between items-center">
        <h2 className="font-medium">{task.name}</h2>
        <Button variant="ghost" size="icon" onClick={deleteTask}>
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
