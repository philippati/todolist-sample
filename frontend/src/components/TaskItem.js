import { useState } from "react";
import "./TaskItem.css";

export default function TaskItem({ task, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const saveEdit = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onUpdate(task._id, {
        title: trimmedTitle,
        description: description.trim(),
      });
      setEditing(false);
    }
  };

  const cancelEdit = () => {
    setTitle(task.title);
    setDescription(task.description || "");
    setEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "task-item--completed" : ""}`}>
      {editing ? (
        <div className="task-item__edit">
          <input
            className="task-item__input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            placeholder="Title"
            autoFocus
          />
          <textarea
            className="task-item__input task-item__input--description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Escape") cancelEdit();
            }}
            placeholder="Description (optional)"
            rows={3}
          />
          <div className="task-item__actions">
            <button className="task-item__btn task-item__btn--save" onClick={saveEdit}>Save</button>
            <button className="task-item__btn task-item__btn--cancel" onClick={cancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-item__content">
            <span className="task-item__title">{task.title}</span>
            {task.description && (
              <p className="task-item__description">{task.description}</p>
            )}
          </div>
          <div className="task-item__actions">
            <button className="task-item__btn task-item__btn--edit" onClick={() => setEditing(true)} aria-label="Edit">✏️</button>
            <button className="task-item__btn task-item__btn--delete" onClick={() => onDelete(task._id)} aria-label="Delete">🗑️</button>
          </div>
        </>
      )}
    </div>
  );
}
