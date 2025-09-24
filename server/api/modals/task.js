const mongoose = require("mongoose");

// Define a schema for individual tasks
const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  color: { type: String, required: true },
});

// Define the schema for a user with tasks
const UserTasksSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tasks: [TaskSchema] // array of tasks
}, { timestamps: true }); // timestamps automatically add createdAt & updatedAt

// Create the model
const UserTasks = mongoose.model("UserTasks", UserTasksSchema);

module.exports = UserTasks;
