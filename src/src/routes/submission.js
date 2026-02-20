import express from "express";
import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";
import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";

const router = express.Router();

// Submit code
/*router.post("/", async (req, res) => {
  const { student, assignmentId, code, language } = req.body;
  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) return res.status(404).json({ error: "Assignment not found" });

  // Auto-grading (very basic check, extend later)
  let grade = 0;
  let total = assignment.testCases.length;

  assignment.testCases.forEach(tc => {
    // In real: run code with child_process & compare outputs
    // Here: just mock correct result for MVP
    if (code.includes(tc.expectedOutput)) grade++;
  });*/
  function runCode(language, code, input, callback) {
  const tempDir = path.join(process.cwd(), "temp");
  fs.ensureDirSync(tempDir);

  let filePath, command;

  if (language === "python") {
    filePath = path.join(tempDir, "Main.py");
    fs.writeFileSync(filePath, code);
    command = `python ${filePath}`;
  } else if (language === "java") {
    filePath = path.join(tempDir, "Main.java");
    fs.writeFileSync(filePath, code);
    command = `javac ${filePath} && java -cp ${tempDir} Main`;
  } else if (language === "cpp") {
    filePath = path.join(tempDir, "main.cpp");
    fs.writeFileSync(filePath, code);
    command = `g++ ${filePath} -o ${tempDir}/main && ${tempDir}/main`;
  } else {
    return callback("Unsupported language");
  }

  // Run the code with input
  const proc = exec(command, (error, stdout, stderr) => {
    if (error) return callback(stderr || error.message);
    callback(null, stdout.trim());
  });

  if (proc.stdin) {
    proc.stdin.write(input);
    proc.stdin.end();
  }
}

// === Submit assignment ===
router.post("/", async (req, res) => {

  try {
    console.log("📥 Submission received:", req.body);
    const { student, assignmentId, code, language } = req.body;
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });

    let passed = 0;
    for (const test of assignment.testCases) {
      const output = await new Promise((resolve, reject) => {
        runCode(language, code, test.input, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });

      if (output === test.expectedOutput) {
        passed++;
      }
    }

    const grade = Math.round((passed / assignment.testCases.length) * assignment.score);
  // Get all submissions for a student
router.get("/student/:id", async (req, res) => {
  try {
    const subs = await Submission.find({ student: req.params.id })
      .populate("assignment", "title module language"); // populate assignment details
    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

 

    const submission = new Submission({
      student,
      assignment: assignmentId,
      code,
      language,
      grade
    });
    await submission.save();

    res.json({ success: true, grade });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Grading failed" });
  }
});

  
export default router;
