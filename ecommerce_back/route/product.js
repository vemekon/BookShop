const express = require("express");
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require("../controller/auth");
const { signupValidate, loginValidate } = require("../helpers/validate");
const {
  create,
  read,
  productById,
  productDelete,
  productUpdate,
  list,
  listAll,
  listRelated,
  listCatagories,
  listBySearch,
  photo,
  listSearch
} = require("../controller/product");
const { userById } = require("../controller/user");

router.get("/products", list);
router.get("/products/search", listSearch);
router.get("/productsall", listAll);

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/product/:productId", read);
router.get("/products/related/:productId", listRelated);
router.get("/products/catagories", listCatagories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.delete(
  "/product/:productId/:userId",
  requireSignin,

  isAuth,
  isAdmin,
  productDelete
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  productUpdate
);

//router.post("/productuu", create);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;

/*

{"_id":{"$oid":"5e724a3ec3a0411ec44827a9"},"name":"Java","createdAt":{"$date":{"$numberLong":"1584548414172"}},"updatedAt":{"$date":{"$numberLong":"1584548414172"}},"__v":{"$numberInt":"0"}} */
