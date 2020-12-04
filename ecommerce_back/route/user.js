const express = require("express");
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require("../controller/auth");
const { signupValidate, loginValidate } = require("../helpers/validate");
const { userById, read, update } = require("../controller/user");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile, msg: " YOU ROCK g" });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;
