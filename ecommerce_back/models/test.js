const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserrSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
module.exports = Userr = mongoose.model("userr", UserrSchema);
