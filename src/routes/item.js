const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const { createitem, getitem } = require("../controllers/item");
const Item = require("../models/Item");
const User = require("../models/User");

router.post("/createitem", createitem);

router.get("/getitem/:id", getitem);

module.exports = router;
