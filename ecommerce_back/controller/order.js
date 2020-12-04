const { Order, CartItem } = require("../models/order");
const User = require("../models/user");

exports.orderById = (req, res, next, id) => {
  console.log("route orderbyid");
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
      if (error || !order) {
        return res.status(400).json({ error: error });
      }
      req.order = order;
      next();
    });
};

exports.create = (req, res) => {
  console.log("create order :", req.body);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({ error: "Not able to create order" });
    }
    res.json({ data });
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .sort("-created")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({ error: error });
      }
      res.json({ orders });
    });
};

exports.getStatusValue = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
/*
exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (error, order) => {
      if (error) {
        return res.status(400).json({ error: error });
      }
      res.json({ orders });
    }
  );
}; */

exports.updateOrderStatus = (req, res) => {
  console.log(req.body.status);
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (error, order) => {
      if (error) {
        return res.status(400).json({ error: "error" });
      }
      res.json({ order });
    }
  );
};
