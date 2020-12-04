const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatagorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);
module.exports = Catagory = mongoose.model("Catagory", CatagorySchema);
