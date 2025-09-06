// src/store/taskStore.ts
import { create } from "zustand";



// Create the store
export const useTaskStore = create((set) => ({
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
