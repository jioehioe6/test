const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // added name
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // hashed password
});

module.exports = mongoose.model("User", UserSchema);
