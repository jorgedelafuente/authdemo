require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const path = require("path")

const app = express();

connectDB();

app.use(express.json({ extended: false }))

// Routes
app.get("/", (req, res) => res.send("API Running"));
app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/profile", require("./routes/api/profile"))

// Serve Static Assets in Production
if (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"))
   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
   })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
