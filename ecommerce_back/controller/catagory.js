const Catagory = require("../models/catagory");

exports.catagoryById = (req, res, next, id) => {
  Catagory.findById(id).exec((err, catagory) => {
    if (err || !catagory) {
      return res.status(400).json({
        err: "catagory unavailable",
      });
    }
    req.catagory = catagory;
    next();
  });
};

exports.create = (req, res) => {
  console.log(req.body);
  const catagory = new Catagory(req.body);

  catagory.save((error, catagory) => {
    if (error) {
      return res.status(400).json({
        error: "error",
      });
    }
    res.json(catagory);
  });
};
exports.read = (req, res) => {
  return res.status(200).json({ msg: req.catagory });
};

exports.update = (req, res) => {
  const catagory = req.catagory;
  catagory.name = req.body.name;
  catagory.save((err, catagory) => {
    if (err) {
      return res.status(400).json({ err: " Unable to save" });
    }
    res.json(catagory);
  });
};
exports.remove = (req, res) => {
  const catagory = req.catagory;
  catagory.remove((err, catagory) => {
    if (err) {
      return res.status(400).json({ err: " Unable to save" });
    }
    res.json({ msg: `${catagory} succesfuly removed` });
  });
};

exports.list = (req, res) => {
  Catagory.find().exec((err, catagory) => {
    if (err) {
      console.log("no");
      return res.status(400).json({ err: " Unable to list" });
    }
    res.status(200).json(catagory);
  });
};
