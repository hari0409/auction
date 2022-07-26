const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    img: {
      type: [String],
      default: [],
    },
    watchers: {
      type: [mongoose.Schema.Types.ObjectId],
      defualt: [],
    },
    status: {
      type: String,
      enum: ["live", "down", "sold"],
      default: "live",
    },
    boughtBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    heldBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    minInc: {
      type: Number,
      required: true,
    },
    categort: {
      type: [String],
      default: [],
      enum: [""],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Item", ItemSchema);
