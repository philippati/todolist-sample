import { useState } from "react";

export default function TaskItem({ task, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const saveEdit = () => {
    onUpdate(task._id, { title });
    setEditing(false);
  };

  return (
    <div style={{ marginTop: 10 }}>
      {editing ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}

      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}

