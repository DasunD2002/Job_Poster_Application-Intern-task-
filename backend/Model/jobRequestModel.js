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
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model("jobRequests", jobRequestSchema);

