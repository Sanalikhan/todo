const BASE_URL = "/api/todo";
import { Task } from "@/store";
// Get all tasks
export const getAPI = async () : Promise<Task[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Görevler alınamadı");
  return res.json();
};

// Get a single task by ID
export const getByIdAPI = async (id: string):Promise<Task | null> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Görev bulunamadı");
  return res.json();
};

// Create new task
export const postAPI = async (data: { title: string; description: string }) : Promise<Task> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Görev eklenemedi");
  return res.json();
};

// Update a task
export const putAPI = async (
  id: string,
  data: { title?: string; description?: string; status?: string }
) : Promise<Task> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Görev güncellenemedi");
  return res.json();
};

// Delete a task
export const deleteAPI = async (id: string) : Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Görev silinemedi");
  return;
};
