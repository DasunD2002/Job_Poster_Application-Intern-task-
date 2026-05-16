import mongoose from "mongoose";

const schema = mongoose.Schema;

const jobRequestSchema = new schema({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contactName: {
    type: String
  },
  contactEmail: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
  },
  status: {
    type: String,
    required: true,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model("jobRequests", jobRequestSchema);
