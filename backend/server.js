console.log("Starting server...");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

console.log("Variables assigned...");

app.use(cors());
app.use(express.json());

console.log("Apps used...");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

console.log("Connected...");

app.use("/api/tasks", require("./routes/tasks"));

app.get("/", (req, res) => res.send("Backend is running"));
console.log("Should be running...");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log("Done...");

