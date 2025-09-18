const express = require("express");
const { spawn } = require("child_process");
const router = express.Router();

function runPython(data, disease) {
  return new Promise((resolve, reject) => {
    const py = spawn("python", ["./python_model/predict_disease.py", JSON.stringify(data), disease]);

    let result = "";
    py.stdout.on("data", (chunk) => {
      result += chunk.toString();
    });

    py.stderr.on("data", (err) => {
      console.error(`Python error: ${err}`);
    });

    py.on("close", () => {
      try {
        resolve(JSON.parse(result));
      } catch (e) {
        reject("Invalid response from Python");
      }
    });
  });
}

// Diarrheal
router.post("/diarrheal", async (req, res) => {
  try {
    const output = await runPython(req.body, "diarrheal");
    res.json(output);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Cholera
router.post("/cholera", async (req, res) => {
  try {
    const output = await runPython(req.body, "cholera");
    res.json(output);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Typhoid
router.post("/typhoid", async (req, res) => {
  try {
    const output = await runPython(req.body, "typhoid");
    res.json(output);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

module.exports = router;
