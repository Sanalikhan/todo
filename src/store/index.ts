// src/store/taskStore.ts
import { create } from "zustand";

// Task type
export type Task = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed"; // Turkish for pending/completed
};

// Zustand store type
type TaskStore = {
  tasks: Task[];
  selectedTask: Task | null;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
  setSelectedTask: (task: Task | null) => void;
};

// Create the store
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  selectedTask: null,

  // Replace the full task list
  setTasks: (tasks) => set({ tasks }),

  // Add a new task to the list
  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),

  // Remove a task by ID
  removeTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

  // Update an existing task by ID
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === updatedTask.id ? { ...t, ...updatedTask } : t
      ),
    })),

  // Set or clear the currently selected task
  setSelectedTask: (task) => set({ selectedTask: task }),
}));
