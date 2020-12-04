const Employee = require("../models/movie");
const Location = require("../models/person");
const Userr = require("../models/test");

exports.movie = async (req, res) => {
  console.log(req.body);
  const employe = new Employee(req.body);
  employe.save((err, employe) => {
    if (err) {
      return res.status(400).json({
        err: "employe not found again"
      });
    }
    res.json(employe);
  });
};

exports.list = (req, res) => {
  Employee.find()
    .populate("locations")
    .exec((err, movie) => {
      if (err) {
        return res.status(400).json({ err: " Unable to list" });
      }
      {
        //console.log(movie[0].locations.location);
        res.status(200).json(movie);
      }
    });
};
exports.dele = (req, res) => {
  console.log(req.body.id);
  Employee.findByIdAndDelete(req.body.id)

    //.populate("locations")
    .exec((err, movie) => {
      if (err) {
        return res.status(400).json({ err: " Unable to delete" });
      }
      res.status(200).send("Deleted");
    });
};
exports.fnd = (req, res) => {
  console.log(req.params.id);
  Employee.findById(req.params.id)

    //.populate("locations")
    .exec((err, movie) => {
      if (err) {
        return res.status(400).json({ err: " Unable to find" });
      }
      {
        console.log(movie.age);
        return res.status(200).send(movie);
      }
    });
};

exports.c = (req, res) => {
  const location = new Location(req.body);
  location.save((err, person) => {
    if (err) {
      return res.status(400).json({
        err: "person not found"
      });
    }
    res.json(location);
  });
};

exports.listc = (req, res) => {
  Location.find().exec((err, location) => {
    if (err) {
      return res.status(400).json({ err: " Unable to list" });
    }
    res.status(200).json(location);
  });
};

exports.cdele = (req, res) => {
  console.log(req.params.id);
  Location.findByIdAndDelete(req.body._id)

    //.populate("locations")
    .exec((err, movie) => {
      if (err) {
        return res.status(400).json({ err: " Unable to delete" });
      }
      res.status(200).send(" new Deleted");
    });
};

exports.unew = async (req, res) => {
  //console.log(req.body);
  const user = new Userr(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "user not found again"
      });
    }
    res.json(user);
  });
};

exports.ulist = (req, res) => {
  Userr.find({ age: { $gt: 17, $lt: 28 } }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ err: " Unable to list" });
    }
    {
      //console.log(user[0].locations.location);
      res.status(200).json(user);
    }
  });
};
