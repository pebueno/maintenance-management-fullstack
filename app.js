// Node.js modules requirements
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
var cors = require("cors");

// Routes
const companies = require("./routes/api/companies");
const assets = require("./routes/api/assets");
const units = require("./routes/api/units");
const users = require("./routes/api/users");

const app = express();

// Connect Database
connectDB();

// Cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// Accessing the path module
app.use(express.static("client/build"));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Use Routes
app.use("/api/companies", companies);
app.use("/api/assets", assets);
app.use("/api/units", units);
app.use("/api/users", users);

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
