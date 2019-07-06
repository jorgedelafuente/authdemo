const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const { check, validationResult } = require("express-validator/check")
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const User = require("../../models/User")

// GET api/auth
// Auth Route
// Private

router.get("/", auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select("-password")
      res.json(user)
      // res.send("Auth route - Access Granted")
   }
   catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
   }
}
)

// POST api/auth
// Authenticate user & get token
// Public


router.post("/", [
   check("email", "Please include a valid email").isEmail(),
   check("password", "Password is required!").exists()
], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const { email, password } = req.body;

   try {
      let user = await User.findOne({ email })

      if (!user) {
         return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }



      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
         return res.status(400).json({ errors: [{ msg: "Invalid Password Credentials" }] });
      }
      // Change msg to Invalid Credentials
      // if (!isMatch) {
      //    return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      // }

      const payload = {
         user: {
            id: user.id
         }
      }

      // JWT Token set to Expire in 3600 Seconds
      jwt.sign(payload, config.get("jwtToken"),
         {
            expiresIn: 36000
         }, (err, token) => {
            if (err) throw err;
            res.json({ token })
            res.send("User Registered")
         }
      )

   } catch (err) {
      console.error(err.message)
      res.status(500).send("Server error")
   }
}
)

module.exports = router;