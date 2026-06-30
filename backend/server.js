require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
const faqRoutes = require("./routes/faqRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("College Chatbot Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});