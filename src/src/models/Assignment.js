import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: String,
  module: String,
  language: { type: String, enum: ["java", "cpp", "python"] },
  deadline: Date,
  score: Number,
  testCases: [
    {
      input: String,
      expectedOutput: String
    }
  ]
});

export default mongoose.model("Assignment", assignmentSchema);
