const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth");
const taskroutes = require("./routes/task");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const serverless = require("serverless-http");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
}));

// MongoDB connection
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    throw err;
  }
};

// Wrap routes with DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use("/", authRoutes);
app.use("/api", taskroutes);

// ✅ Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
