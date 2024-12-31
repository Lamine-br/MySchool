const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
	console.log(`Serveur lancé sur http://localhost:${PORT}`)
);
