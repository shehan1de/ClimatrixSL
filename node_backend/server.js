require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const connectDB = require("./Configuration/db");
const authRoutes = require("./Route/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/image", express.static(path.join(__dirname, "image")));

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(process.env.PORT || 5001, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
