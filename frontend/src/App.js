import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./components/TaskItem";

const API_URL = process.env.REACT_APP_API_URL;

console.log("API URL:", process.env.REACT_APP_API_URL);

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    const res = await axios.post(API_URL, { title });
    setTasks([...tasks, res.data]);
    setTitle("");
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const updateTask = async (id, updates) => {
    const res = await axios.put(`${API_URL}/${id}`, updates);
    setTasks(tasks.map(task => task._id === id ? res.data : task));
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h1>To-Do List</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

      {Array.isArray(tasks) && tasks.map(task => (
        <TaskItem key={task._id} task={task} onDelete={deleteTask} onUpdate={updateTask} />
      ))}
    </div>
  );
}

export default App;

