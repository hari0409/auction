const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const { createitem, getitem, getall, search } = require("../controllers/item");
const Item = require("../models/Item");
const User = require("../models/User");

//Create an auction item-->HB
router.post("/createitem", createitem);

//Get auction item by id-->HB
router.get("/getitem/:id", getitem);

//Get all items based on category for recommendation-->RJS
router.get("/getall");

//Get item based on search value-->RJS
router.get("/search/:val");

//Update item data-->RJS
router.put("/getitem/:id");

//Bring down the auctioned item-->RJS
router.post("/down/:id");

//Approve the amount & change status to sold for auction item-->RJS
router.post("/accept/:id");

//Bring auction live-->HB
router.post("/up/:id");

module.exports = router;
