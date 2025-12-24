const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const slotRoutes = require("./routes/slot.routes");
const interviewRoutes = require("./routes/interview.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/interviews", interviewRoutes);

module.exports = app;
