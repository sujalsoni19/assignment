export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between border rounded px-4 py-2">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
        />

        <span className={task.completed ? "line-through text-slate-400" : ""}>
          {task.title}
        </span>
      </div>

      <button onClick={() => onDelete(task._id)} className="text-sm">
        ✕
      </button>
    </div>
  );
}
