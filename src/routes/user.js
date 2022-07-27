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

//Get user data-->HB
router.get("/getuser/:id", getuser);

//Place a bid-->HB
router.post("/placebid", placebid);

//Add to wacthlist-->HB
router.post("/addtowatchlist", addToWatchlist);

//Remove from watchlist-->HB
router.post("/removefromwatchlist", removeFromWatchlist);

//Get watchlist-->HB
router.get("/watchlist", getWatchlist);

//Payment for a auction item-->HB
router.post("/pay");
module.exports = router;
