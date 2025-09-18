const mongoose = require("mongoose");

const talukSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
  enteredBy: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Taluk3", talukSchema, "Taluk3");
