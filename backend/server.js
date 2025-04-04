require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const billboardRoutes = require("./routes/Billboard"); 
const powerbiRoutes = require("./routes/powerbi");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"],
    credentials: true, 
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/billboards", billboardRoutes); 
app.use("/api/powerbi", powerbiRoutes);


const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MongoDB connection URI is missing. Add MONGO_URI in your .env file.");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

