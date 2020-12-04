const express = require("express");
const router = express.Router();

const {
	signup,
	signin,
	signout,
	check,
	requireSignin
} = require("../controller/auth");
const { signupValidate, loginValidate } = require("../helpers/validate");

router.post("/signup", signupValidate, signup);
router.post("/signin", loginValidate, signin);
router.get("/signout", signout);
router.get("/check", requireSignin, check);

module.exports = router;
