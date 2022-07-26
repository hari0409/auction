const router = require("express").Router();
const {
  login,
  create,
  verify,
  requestreset,
  confirm,
} = require("../controllers/auth");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const { decrypt } = require("../lib/tokenizer");
const sendEmail = require("../lib/sendEmail");
const crypto = require("crypto");

router.post("/create", create);

router.post("/login", login);

router.post("/verify", verify);

router.post("/requestreset", requestreset);

router.post("/confirm", confirm);

module.exports = router;
