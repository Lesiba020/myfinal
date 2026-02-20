import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
  code: String,
  language: String,
  grade: Number,
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Submission", submissionSchema);
