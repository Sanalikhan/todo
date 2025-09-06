// src/components/AddTaskForm.tsx
import React, { useState } from "react";
import { postAPI } from "../services/fetchAPI"; // your helper
import { useTaskStore, Task } from "../store/index";

interface AddTaskFormProps {
  show: boolean;
  onClose: () => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ show, onClose }) => {
  const addTask = useTaskStore((state) => state.addTask);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert("Başlık boş olamaz!");
    if (title.length > 50) return alert("Başlık en fazla 50 karakter olmalıdır!");
    if (description.length > 200) return alert("Açıklama en fazla 200 karakter olmalıdır!");

    try {
      // API call
      const newTask: Task = await postAPI({ title, description });
      // Update store state
      addTask(newTask);

      // Reset form
      setTitle("");
      setDescription("");
      onClose();
    } catch (err: any) {
      console.error(err);
      alert("Görev eklenemedi!");
    }
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 transition-opacity">
          <div className="bg-white rounded-4xl shadow-lg p-6 w-96 max-w-full transform transition-transform duration-300 scale-100">
            <h2 className="text-xl mb-4 montserrat-regular2">Yeni Görev Ekle</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Başlık"
                value={title}
                maxLength={50}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-purple-800 rounded-full px-4 py-2  focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <textarea
                placeholder="Açıklama..."
                value={description}
                maxLength={200}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-purple-800 rounded-3xl px-4 pt-2 h-24 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-purple-700 text-white hover:bg-purple-600 hover:text-black transition-all"
                >
                  Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
