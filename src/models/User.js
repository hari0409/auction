const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    listed: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    ethAddr: {
      type: String,
      required: true,
    },
    bought: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    watchlist: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    heldItems: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    resetToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", UserSchema);
