// Node.js modules requirements
const express = require("express");
const connectDB = require("./config/db");
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

app.get("/", (req, res) => res.send("Hello world!"));

// Use Routes
app.use("/api/companies", companies);
app.use("/api/assets", assets);
app.use("/api/units", units);
app.use("/api/users", users);

const port = process.env.PORT || 8082;

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
