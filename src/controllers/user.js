const { default: mongoose, mongo } = require("mongoose");
const sendEmail = require("../lib/sendEmail");
const Item = require("../models/Item");
const User = require("../models/User");

exports.getuser = async (req, res, next) => {
  try {
    const user = await User.findById(mongoose.Types.ObjectId(req.params.id));
    if (!user) {
      return res.status(404).json({
        status: "failure",
        msg: "Invalid email id",
      });
    }
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.placebid = async (req, res, next) => {
  try {
    const { email, id, amount } = req.body;
    const user = await User.findOne({
      email: email,
    });
    const item = await Item.findById(mongoose.Types.ObjectId(id));
    if (!user) {
      return res.status(404).json({
        status: "failure",
        msg: "User not found",
      });
    }
    if (!item) {
      res.status(404).json({
        status: "failure",
        msg: "Item not found",
      });
    }
    let prevPrice = item.currentPrice;
    if (amount > item.basePrice && amount > item.currentPrice) {
      const emailData = `The item ${item.name}'s price have increased from ${prevPrice} to ${item.currentPrice}.`;
      const subject = `Update on ${item.name}`;
      if (item.heldBy) {
        const oldUser = await User.findByIdAndUpdate(
          item.heldBy,
          {
            $pull: {
              heldItems: mongoose.Types.ObjectId(item._id),
            },
          },
          { new: true }
        );
        console.log(oldUser);
        sendEmail(oldUser.email, emailData, subject);
      }
      item.currentPrice = amount;
      item.heldBy = user._id;
      user.heldItems.push(item._id);
      item.watchers.forEach(async (id) => {
        const user = await User.findById(mongoose.Types.ObjectId(id), {
          email: 1,
          _id: 0,
        });
        sendEmail(user.email, emailData, subject);
      });
      await item.save();
      await user.save();
      res.status(200).json({
        status: "success",
        item,
      });
    } else {
      return res.status(409).json({
        status: "failure",
        msg: "Value is either less than base price or current bid",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addToWatchlist = async (req, res, next) => {
  try {
    const { email, id } = req.body;
    const user = await User.findOne({
      email: email,
    });
    const item = await Item.findById(mongoose.Types.ObjectId(id));
    if (!item) {
      return res.status(404).json({
        status: "failure",
        msg: "Item doesnt exists",
      });
    }
    if (!user) {
      return res.status(404).json({
        status: "failure",
        msg: "User doesnt exists",
      });
    }
    if (user.watchlist.includes(id)) {
      return res.status(404).json({
        status: "failure",
        msg: "Item already exists",
      });
    }
    user.watchlist.push(id);
    item.watchers.push(user._id);
    await user.save();
    await item.save();
    return res.status(200).json({
      status: "success",
      msg: "Item added to watchlist",
    });
  } catch (error) {
    next(error);
  }
};

exports.removeFromWatchlist = async (req, res, next) => {
  try {
    const { email, id } = req.body;
    const user = await User.findOne({
      email: email,
    });
    const item = await Item.findById(mongoose.Types.ObjectId(id));
    if (!item) {
      return res.status(404).json({
        status: "failure",
        msg: "Item doesnt exists",
      });
    }
    if (!user) {
      return res.status(404).json({
        status: "failure",
        msg: "User doesnt exists",
      });
    }
    if (user.watchlist.includes(id)) {
      let index = user.watchlist.indexOf(id);
      user.watchlist = user.watchlist.splice(index, 1);
      let windex = item.watchers.indexOf(user._id);
      item.watchers = item.watchers.splice(windex, 1);
      await item.save();
      await user.save();
      return res.status(200).json({
        status: "success",
        msg: "Item removed from watchlist",
      });
    }
    return res.status(402).json({
      status: "failure",
      msg: "Item doesnt exists in watchlist",
    });
  } catch (error) {
    next(error);
  }
};

exports.getWatchlist = async (req, res, next) => {
  try {
    const { email, pgNo, limit } = req.body;
    const user = await User.findOne(
      {
        email,
      },
      {
        watchlist: 1,
      }
    )
      .skip((pgNo - 1) * limit)
      .limit(limit);
    if (user) {
      return res.status(200).json({
        status: "success",
        user,
      });
    }
    return res.status(404).json({
      status: "failure",
      msg: "User doesnt exists",
    });
  } catch (error) {
    next(error);
  }
};
