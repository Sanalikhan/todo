// services/fetchApis.ts

const BASE_URL = "/api/todo"; // base path for your todo API

export const getAPI = async (endpoint = "") => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export const postAPI = async (data: any) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to post");
  return res.json();
};

export const putAPI = async (id: string, data: any) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
};

export const deleteAPI = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete");
  return res.json();
};
