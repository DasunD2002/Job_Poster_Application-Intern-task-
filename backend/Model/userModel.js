import mongoose from "mongoose";
const schema = mongoose.Schema;

const userModel = new schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model("users", userModel);