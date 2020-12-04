/*const mongoose = require("mongoose");


const EmployeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  locations: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location"
  }
});

module.exports = Employee = mongoose.model("employee", EmployeeSchema)

*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    name: String,
    age: Number,
    locations: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location"
    }
  },
  { timestamps: true }
);
module.exports = Employee = mongoose.model("employee", EmployeeSchema);
