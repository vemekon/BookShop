const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true
    },

    description: {
      type: String,
      maxlength: 2000,
      required: true
    },
    price: {
      type: Number,
      trim: true,
      required: true
    },
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory"
    },
    quantity: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    amount: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    shipping: {
      type: Boolean,
      required: false
    }
  },
  { timestamps: true }
);
module.exports = Product = mongoose.model("product", ProductSchema);
