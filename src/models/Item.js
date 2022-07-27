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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    minInc: {
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
    proof: {
      type: [String],
      default: [],
    },
    category: {
      type: [String],
      default: [],
      enum: [
        "collectibles & art",
        "electronics",
        "fashion",
        "home & garden",
        "auto parts & accessories",
        "musical instruments & gears",
        "spoorting goods",
        "toys & hobbies",
        "video games & consoles",
        "business & international",
      ],
    },
    transactionId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Item", ItemSchema);
