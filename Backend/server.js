
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const predictionRoutes = require("./routes/predictionRoutes");
const authRoutes = require("./routes/authRoutes");
const talukRoutes = require("./routes/talukRoutes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

app.use("/auth", authRoutes);       
app.use("/taluk", talukRoutes);   
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

app.use("/predict", predictionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));