const router = require("express").Router();
const { login, create } = require("../controllers/auth");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");

router.post("/create", async (req, res, next) => {
  try {
    const data = req.body;
    const dupuser = await User.findOne({
      email: data.email,
    });
    if (!dupuser) {
      const password = data.password;
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const user = new User({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        ethAddr: data.ethAddr,
      });
      await user.save();
      res.status(200).json({
        status: "success",
        user,
      });
    } else {
      res.status(401).json({
        status: "failure",
        msg: "Email already exists",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(404).json({
        status: "failure",
        msg: "Incorrect password or email",
      });
    }
    const status = await bcryptjs.compare(password, user.password);
    if (status) {
      return res.status(200).json({
        status: "success",
        user,
      });
    } else {
      return res.status(401).json({
        status: "failure",
        msg: "Incorrect password or email",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
