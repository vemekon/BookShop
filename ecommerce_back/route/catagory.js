const express = require("express");
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require("../controller/auth");
const { signupValidate, loginValidate } = require("../helpers/validate");
const {
  create,
  catagoryById,
  read,
  remove,
  update,
  list,
} = require("../controller/catagory");
const { userById } = require("../controller/user");

router.get("/catagory/:catagoryId", read);
router.post("/catagory/create/:userId", requireSignin, isAdmin, isAuth, create);
router.put(
  "/catagory/:catagoryId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  update
);
router.delete(
  "/catagory/:catagoryId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  remove
);
router.get(
  "/catagories",

  list
);

router.param("catagoryId", catagoryById);

router.param("userId", userById);

module.exports = router;
