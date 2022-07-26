const { default: mongoose } = require("mongoose");
const Item = require("../models/Item");
const User = require("../models/User");

exports.createitem = async (req, res, next) => {
  try {
    const { email, name, basePrice, img, minInc } = req.body;
    const user = await User.findOne(
      {
        email: email,
      },
      {
        email: 1,
        listed: 1,
      }
    );
    if (!user) {
      res.status(404).json({
        status: "faiure",
        msg: "User not found",
      });
    }
    if (!img || !name || !basePrice) {
      res.status(404).json({
        status: "faiure",
        msg: "Either name or image array or basePrice is missing",
      });
    }
    const item = new Item({
      name,
      basePrice,
      img,
      currentPrice: basePrice,
      minInc,
    });
    await item.save();
    user.listed.push(item._id);
    await user.save();
    res.status(200).json({
      status: "success",
      item,
    });
  } catch (error) {
    next(error);
  }
};

exports.getitem = async (req, res, next) => {
  try {
    const item = await Item.findById(mongoose.Types.ObjectId(req.params.id));
    if (!item) {
      return res.status(404).json({
        status: "failure",
        msg: "Item with tha id doesnt exists",
      });
    }
    res.status(200).json({
      status: "success",
      item,
    });
  } catch (error) {
    next(error);
  }
};
