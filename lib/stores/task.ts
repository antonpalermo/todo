import { Task } from "@prisma/client";
import { create } from "zustand";

type TaskStore = {
  tasks: Task[];
  selectedTask: string;
  fetchTasks: (tasks: Task[]) => void;
  onSelectTask: (taskId: string) => void;
};

export const useTaskStore = create<TaskStore>(set => ({
  tasks: [],
  selectedTask: "",
  fetchTasks: tasks => set(() => ({ tasks })),
  onSelectTask: taskId => set(() => ({ selectedTask: taskId }))
}));
