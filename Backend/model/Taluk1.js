const mongoose = require("mongoose");

const talukSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed, 
  enteredBy: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Taluk1", talukSchema, "Taluk1");
