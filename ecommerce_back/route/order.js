const express = require("express");
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require("../controller/auth");
const { userById, addOrderToUserHistory } = require("../controller/user");
const {
  create,
  listOrders,
  getStatusValue,
  orderById,
  updateOrderStatus
} = require("../controller/order");
const { decreaseQuantity } = require("../controller/product");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);
router.get("/order/list/:userId", requireSignin, isAdmin, isAuth, listOrders);
router.get(
  "/order/status-values/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  getStatusValue
);
router.put(
  "/order/status/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  updateOrderStatus
);

router.param("orderId", orderById);

router.param("userId", userById);

module.exports = router;
