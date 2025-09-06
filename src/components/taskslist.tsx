// src/components/TasksList.tsx
import React, { useEffect, useState } from "react";
import { useTaskStore, Task } from "../store/index";
import { getAPI, putAPI, deleteAPI } from "../services/fetchAPI";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

// Map internal English status to Turkish display
const statusMap: Record<"pending" | "completed", string> = {
  pending: "Açık",
  completed: "Tamamlandı",
};

export const TasksList: React.FC = () => {
  const { tasks, setTasks, updateTask } = useTaskStore();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ title: string; description: string; status: Task["status"] }>({
    title: "",
    description: "",
    status: "pending",
  });

  // Fetch tasks from backend
  useEffect(() => {
    getAPI().then(setTasks).catch(console.error);
  }, [setTasks]);

  // Handle drag & drop
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const task = tasks[result.source.index];
    const newStatus: Task["status"] =
      result.destination.droppableId === "pending" ? "pending" : "completed";

    // Update API
    const updatedTask = await putAPI(task.id, { ...task, status: newStatus });
    updateTask(updatedTask);
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    await deleteAPI(id);
    const refreshed = await getAPI();
    setTasks(refreshed);
  };

  // Handle Edit
  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setFormData({
      title: task.title,
      description: task.description || "",
      status: task.status,
    });
  };

  const handleUpdate = async () => {
    if (!editingTaskId) return;
    const updatedTask = await putAPI(editingTaskId, formData);
    updateTask(updatedTask);
    setEditingTaskId(null);
  };

  const handleCancel = () => {
    setEditingTaskId(null);
  };

  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const renderTask = (task: Task, index: number) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-3 mb-2 rounded-2xl shadow"
        >
          {editingTaskId === task.id ? (
            <div className="space-y-2 mt-2">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border p-2 rounded-3xl w-full border-purple-700 pl-4"
              />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="pl-4 border border-purple-700 p-2 rounded w-full h-32"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Task["status"] })}
                className="border border-purple-700 p-2 rounded-3xl w-full pl-4"
              >
                <option value="pending">Açık</option>
                <option value="completed">Tamamlandı</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-purple-600 text-white px-3 py-1 rounded-full"
                >
                  Update
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 px-3 py-1 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start slide-up">
              <div>
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-gray-600">{task.description}</p>
                <span className="text-xs text-gray-500">{statusMap[task.status]}</span>
              </div>
              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={() => handleEditClick(task)}
                  className="text-purple-800 hover:text-white bg-white p-2 hover:bg-purple-800 hover:rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-700 hover:text-white bg-white rounded-full p-2 hover:bg-red-700 hover:rounded-full transition delay-100 duration-100 ease-in-out hover:translate-y-1 hover:font-bold hover:cursor-pointer hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="sm:flex gap-2 sm:gap-6 mt-8 sm:px-2 montserrat-regular2">
        {/* Pending Tasks */}
        <Droppable droppableId="pending">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex-1 bg-green-300 py-4 px-1 sm:p-4 rounded-3xl min-h-[400px]"
            >
              <h3 className="font-bold mb-4 pl-2">{statusMap["pending"]} Görevler</h3>
              {pendingTasks.map((task, index) => renderTask(task, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Completed Tasks */}
        <Droppable droppableId="completed">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex-1 bg-green-100 py-4 px-1 sm:p-4 rounded-3xl min-h-[400px]"
            >
              <h3 className="font-bold mb-4 pl-2">{statusMap["completed"]} Görevler</h3>
              {completedTasks.map((task, index) => renderTask(task, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
