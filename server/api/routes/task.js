const express = require("express");
const router = express.Router();
const UserTasks = require("../modals/task"); // your model
const authMiddleware = require("../midddielware/authMiddleware"); // import middleware


// GET all tasks for a specific user
router.get("/tasks",authMiddleware, async (req, res) => {
      const userId = req.userId; 


  try {
    // Find tasks by userId
    const userTasks = await UserTasks.findOne({ userId });

    if (!userTasks) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.status(200).json(userTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Update tasks for a user
router.put("/tasks", authMiddleware, async (req, res) => {
  console.log("PUT /tasks called with body:", req.body);
  try {
    const userId = req.userId; // 🔹 get userId from JWT (assuming authMiddleware sets req.user)
    const { tasks } = req.body; // tasks should be an array of objects [{ date, title }, ...]
    console.log("User ID from token:", userId);

    if (!Array.isArray(tasks)) {
      return res.status(400).json({ message: "Tasks must be an array" });
    }

    // Find the user's tasks document
    let userTasks = await UserTasks.findOne({ userId });

    if (!userTasks) {
      // If no document exists, create a new one
      userTasks = new UserTasks({ userId, tasks });
    } else {
      // Update the tasks array
      userTasks.tasks = tasks;
    }

    await userTasks.save();

    res.status(200).json({ message: "Tasks updated successfully", tasks: userTasks.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Route to add a single task
router.post("/tasks/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // 🔹 get userId from JWT
    const { task } = req.body; // task should be an object like { date, title, color, completed }

    if (!task || typeof task !== "object") {
      return res.status(400).json({ message: "Task must be an object" });
    }

    // Find the user's tasks document
    let userTasks = await UserTasks.findOne({ userId });

    if (!userTasks) {
      // If no document exists, create a new one with this task
      userTasks = new UserTasks({ userId, tasks: [task] });
    } else {
      // Add the new task to the existing tasks array
      userTasks.tasks.push(task);
    }

    await userTasks.save();

    res.status(200).json({ message: "Task added successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
