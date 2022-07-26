const { default: mongoose } = require("mongoose");
const {
  getuser,
  placebid,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} = require("../controllers/user");
const Item = require("../models/Item");
const User = require("../models/User");
const router = require("express").Router();
const sendEmail = require("../lib/sendEmail");

//Get user data
router.get("/getuser/:id", getuser);

//Place a bid
router.post("/placebid", placebid);

//Add to wacthlist
router.post("/addtowatchlist", addToWatchlist);

//Remove from watchlist
router.post("/removefromwatchlist", removeFromWatchlist);

//Get watchlist
router.get("/watchlist", getWatchlist);
module.exports = router;
