import express from "express";
import Assignment from "../models/Assignment.js";

const router = express.Router();

// Create assignment
/*router.post("/", async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/
router.post("/", async (req, res) => {
  try {
    const { title, module, language, deadline, score, testCases } = req.body;

    const assignment = new Assignment({
      title,
      module,
      language,
      deadline,
      score,
      testCases // expect [{input: "...", expectedOutput: "..."}]
    });

    await assignment.save();
    res.json({ message: "Assignment created", assignment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all assignments
/*router.get("/", async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});*/
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find(); // fetch all from DB
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
