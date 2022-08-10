const { default: mongoose } = require("mongoose");
const Item = require("../models/Item");
const User = require("../models/User");
const sendEamil = require("../lib/sendEmail");

exports.createitem = async (req, res, next) => {
  try {
    const { email, name, basePrice, img, minInc, desc, category, proof } =
      req.body;
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
      owner: user._id,
      desc,
      category,
      proof,
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

exports.reject = async (req, res, next) => {
  try {
    const { email, id } = req.body;
    const user = await User.findOne(
      {
        email: email,
      },
      { listed: 1 }
    );
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({
        status: "failure",
        msg: "Item not found",
      });
    }
    if (!user) {
      return res.status(404).json({
        status: "failure",
        msg: "user not found",
      });
    }
    if (!user.listed.includes(id)) {
      return res.status(200).json({
        status: "failure",
        msg: "Cannot be done because you are not the owner",
      });
    }
    if ((item.boughtBy = null && item.status == "sold")) {
      const subject = `${item.name} is live again`;
      const emailBody = `The previous offer for ${item.name} has been rejected & has been made live again`;
      sendEamil(item.heldBy, emailBody, subject);
      item.status = "live";
      item.heldBy = null;
      item.watchers.map(async (w) => {
        const u = await User.findById(w, { email: 1, _id: 0 });
        sendEamil(u.email, emailBody, subject);
      });
      await User.findByIdAndUpdate(item.heldBy, {
        $pull: {
          heldItems: item_id,
        },
      });
      await item.save();
    } else {
      return res.status(403).json({
        status: "failure",
        msg: "Cannot reject offer because the offer is already live not bought by any one",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.live = async (req, res, next) => {
  try {
    const { email, id } = req.body;
    const user = await User.findOne(
      {
        email: email,
      },
      { listed: 1 }
    );
    if (!user.listed.includes(id)) {
      return res.status(403).json({
        status: "failure",
        msg: "Cannot bring it live because not the owner",
      });
    }
    const item = await Item.findById(mongoose.Types.ObjectId(id));
    if (!item) {
      return res.status(404).json({
        status: "failure",
        msg: "Item not found",
      });
    }
    if (item.status == "down") {
      item.status = "live";
      await item.save();
      return res.status(200).json({
        status: "success",
        item,
      });
    } else {
      return res.status(401).json({
        status: "failure",
        msg: "Either already live or sold",
      });
    }
  } catch (error) {
    next(error);
  }
};

// exports.getDown = async (req, res, next) => {
//   try {
//     const { email,id } = req.body;
//     const user = await User.findOne({
//       email: email
//     }, {
//       listed: 1
//     });
//     if (!user) {
//       return res.status(404).json({
//         status: "failure",
//         msg: "user not found"
//       })
//     }
//     if (!user.listed.includes(id)) {
//       res.status(400).json({
//         status: "failure",
//         msg: "user not the owner of the item"
//       })
//     }
//     // const item = await Item.findOne(mongoose.Types.ObjectId(id));
//     const item = await Item.findById(mongoose.Types.ObjectId(id));
//     console.log(item);
//     if (item.status == "live") {
//       item.status = "down";
//       await item.save();
//       res.status(200).json({
//         status: "success",
//         msg: "data updated"
//       })
//     }
//     return res.status(400).json({ status: "failure", msg: "item is not live" })
//   } catch (error) {
//     next(error);
//   }
// }

exports.getDown = async (req, res, next) => {
  try {
    const { email, id } = req.body;
    const user = await User.findOne({ email: email }, {
      listed: 1
    });

    if (!user) {
      res.status(404).json({ status: "failure", msg: "user not found" })
    }
    if (!user.listed.includes(id)) {
      res.status(404).json({
        status: "failure",
        msg: "user not owner of item"
      })

      const item = await Item.findById(mongoose.Types.ObjectId(id));
      if (item.status == "live") {
        item.status = "down";
        await save();
      }
      return res.status(400).json({ status: "failure", msg: "item is not live" })
    }
  } catch (error) {
    next(error);
  }
}