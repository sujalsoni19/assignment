import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/Authcontext.jsx";
import TaskCard from "../components/TaskCard.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    api.get("/api/tasks").then((res) => setTasks(res.data.data));
  }, []);

  const createTask = async (data) => {
    const res = await api.post("/api/tasks", data);
    setTasks([res.data.data, ...tasks]);
    reset();
    setShowForm(false);
  };

  const toggleTask = async (id) => {
    const res = await api.patch(`/api/tasks/${id}/toggle`);
    setTasks(tasks.map((t) => (t._id === id ? res.data.data : t)));
  };

  const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 auto-rows-min items-start">
        <div className="text-center bg-white/60 rounded p-4 space-y-4 self-start">
          <img
            src={`http://localhost:8000${user.avatar}`}
            className="w-20 h-20 sm:w-50 sm:h-50 rounded-full object-cover mx-auto"
          />

          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>

          <button
            onClick={() => navigate("/change-password")}
            className="text-sm underline text-slate-600"
          >
            Change password
          </button>
        </div>

        <div className="bg-white/60 rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Tasks</h2>
            <button onClick={() => setShowForm(true)} className="text-xl">
              +
            </button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        </div>

        {showForm && (
          <div
            onClick={() => setShowForm(false)}
            className="fixed inset-0 bg-black/80 px-2 flex items-center justify-center"
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit(createTask)}
              className="bg-white p-6 rounded border w-full max-w-sm"
            >
              <input
                {...register("title", { required: true })}
                placeholder="Task title"
                className="w-full border px-3 py-2 mb-4"
              />

              <button className="w-full border py-2">Create</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
