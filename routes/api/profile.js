const express = require("express");
const router = express.Router();

// GET api/profile
// Test Route
// Public

router.get("/", (req, res) => res.send("Profile route"))

module.exports = router;