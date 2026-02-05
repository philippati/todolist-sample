import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./components/TaskItem";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    const res = await axios.post(API_URL, {
      title: title.trim(),
      description: description.trim(),
    });
    setTasks([...tasks, res.data]);
    setTitle("");
    setDescription("");
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const updateTask = async (id, updates) => {
    const res = await axios.put(`${API_URL}/${id}`, updates);
    setTasks(tasks.map(task => task._id === id ? res.data : task));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addTask();
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">To-Do List</h1>
        <p className="subtitle">Stay organized, one task at a time</p>
      </header>

      <div className="add-form">
        <div className="add-form__fields">
          <input
            className="add-input add-input--title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Title"
          />
          <textarea
            className="add-input add-input--description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Description (optional)"
            rows={2}
          />
        </div>
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p>No tasks yet. Add one above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
