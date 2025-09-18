const mongoose = require("mongoose");

const districtAuthSchema = new mongoose.Schema({
  talukName: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },// store hashed password
}, { timestamps: true });

module.exports = mongoose.model("DistrictAuth", districtAuthSchema, "DistrictAuth");
