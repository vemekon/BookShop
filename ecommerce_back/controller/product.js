const Product = require("../models/product");
const Catagory = require("../models/catagory");

const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image cannot be uploaded"
      });
    }
    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: "image should be less than 1mb" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          err: err
        });
      }
      res.json(result);
    });
  });
};

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("catagory")
    .exec((error, product) => {
      if (error || !product) {
        res.status(400).json({ error: "Unable to fetch a product" });
      }
      req.product = product;
      next();
    });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  res.status(200).send(req.product);
};

exports.productDelete = (req, res) => {
  let product = req.product;
  product.remove((error, product) => {
    if (error) {
      res.status(400).json({ error: "Unable to remove" });
    }
    res.status(200).json({
      msg: `Product ${product.name} removed`
    });
  });
};
exports.productUpdate = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image cannot be uploaded"
      });
    }
    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: "image should be less than 1mb" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          err: "img not saveable"
        });
      }
      res.json(result);
    });
  });
};

// products?sortBy=price&order=desc&limit=4
// products?sortBy=createdAt&order=desc&limit=4
// products?sortBy=sold&order=desc&limit=4

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;

  Product.find({ price: { $gt: 17, $lt: 66 } })
    .select("-photo")
    .populate("catagory")

    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          err: "Product not found"
        });
      }
      res.status(200).send(product);
    });
};

exports.listAll = (req, res) => {
  Product.find({})
    .select("-photo")
    .populate(" catagory ")
    .exec((error, product) => {
      if (error) {
        return res
          .status(400)
          .json({ error: "Unable to fetch all product all" });
      }
      res.status(200).json(product);
    });
};

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;

  Product.find({ _id: { $ne: req.product }, catagory: req.product.catagory })
    //Product.find({});

    //Product.find()
    .select("-photo")
    // .limit(limit)
    .populate("catagory")
    .exec((error, products) => {
      if (error) {
        return res
          .status(400)
          .json({ error: "Unable to fetch all related products" });
      }
      res.status(200).json(products);
    });
};

exports.listCatagories = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;

  Product.distinct("catagory", {}, (error, catagory) => {
    if (error) {
      return res
        .status(400)
        .json({ error: "Unable to fetch all related products" });
    }
    res.status(200).json(catagory);
  });
};

exports.listBySearch = (req, res) => {
  console.log(req.body);
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 8;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  Product.find(findArgs)

    .select("-photo")
    .limit(limit)
    .populate("catagory")
    .sort([[sortBy, order]])
    .skip(skip)
    .exec((error, products) => {
      if (error) {
        return res
          .status(400)
          .json({ error: "Unable to fetch all related products" });
      }
      res.status(200).json({ size: products.length, products });
    });
};

exports.photo = (req, res) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // console.log(req.query.catagory);

  let query = {};
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
  }
  if (req.query.catagory && req.query.catagory !== "All") {
    query.catagory = req.query.catagory;
  }

  console.log(query.catagory);
  Product.find(query, (error, product) => {
    if (error) {
      res.status(400).json({ error: "error fetching" });
    }
    res.status(200).json(product);
  }).select("-photo");
};

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } }
      }
    };
  });

  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({ error: "Unable to apdate products" });
    }
    next();
  });
};
