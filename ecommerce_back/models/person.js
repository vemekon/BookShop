const mongoose = require("mongoose");

const LocationsSchema = new mongoose.Schema({
  location: String
});

module.exports = Location = mongoose.model(
  "Location",
  LocationsSchema
  //"locations"
);
