import { create } from "zustand";

type TaskStore = {
  selectedTask: string;
  onSelectTask: (taskId: string) => void;
};

export const useTaskStore = create<TaskStore>(set => ({
  selectedTask: "",
  onSelectTask: taskId => set(state => ({ selectedTask: taskId }))
}));
