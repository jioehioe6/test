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

// Enable CORS with credentials
app.use(cors({
  origin: true,
  credentials: true,
}));

// Routes
app.use("/", authRoutes);
app.use("/api", taskroutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
// ✅ Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);