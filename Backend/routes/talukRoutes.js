const express = require("express");
const Taluk1 = require("../model/Taluk1");
const Taluk2 = require("../model/Taluk2");
const Taluk3 = require("../model/Taluk3");

const authMiddleware = require("../middleware/authMiddleware"); // <--- THIS

const router = express.Router();

const getTalukModel = (talukName) => {
  if (talukName === "Taluk1") return Taluk1;
  if (talukName === "Taluk2") return Taluk2;
  if (talukName === "Taluk3") return Taluk3;
  throw new Error("Invalid taluk name");
};

//Add symptoms (taluk auto-detected from token)
router.post("/symptoms/add", authMiddleware, async (req, res) => {
  try {
    const { talukName, username } = req.user; // use username from JWT
    const TalukModel = getTalukModel(talukName);

    const entry = new TalukModel({
      data: req.body.data,
      enteredBy: username, // store the username
      createdAt: new Date()
    });

    await entry.save();
    res.status(201).json({ message: "Data added", entry });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


// ✅ Get all data (for logged-in taluk)
// Fetch average symptoms per taluk
router.get("/symptoms/average-all-taluks", async (req, res) => {
  try {
    // Fetch all data from each Taluk
    const taluk1Data = await Taluk1.find();
    const taluk2Data = await Taluk2.find();
    const taluk3Data = await Taluk3.find();

    // Function to calculate average for one taluk
    const calcAverage = (arr) => {
      if (arr.length === 0) return null; // No data
      const sum = arr.reduce(
        (acc, item) => {
          const d = item.data;
          return {
            abdominalPain: acc.abdominalPain + (d.abdominalPain || 0),
            nauseaVomiting: acc.nauseaVomiting + (d.nauseaVomiting || 0),
            weaknessLossOfAppetite: acc.weaknessLossOfAppetite + (d.weaknessLossOfAppetite || 0),
            fever: acc.fever + (d.fever || 0),
          };
        },
        { abdominalPain: 0, nauseaVomiting: 0, weaknessLossOfAppetite: 0, fever: 0 }
      );

      const n = arr.length;
      return {
        abdominalPain: sum.abdominalPain / n,
        nauseaVomiting: sum.nauseaVomiting / n,
        weaknessLossOfAppetite: sum.weaknessLossOfAppetite / n,
        fever: sum.fever / n,
      };
    };

    // Calculate averages
    const taluk1Avg = calcAverage(taluk1Data);
    const taluk2Avg = calcAverage(taluk2Data);
    const taluk3Avg = calcAverage(taluk3Data);

    res.json({
      taluk1: taluk1Avg || "No data",
      taluk2: taluk2Avg || "No data",
      taluk3: taluk3Avg || "No data",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
