const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists)
    return res.status(400).json({ error: "user already exists" });
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  const newUSer = new User({
    name,
    email,
    password: hashpassword,
    role
  });
  try {
    const savedUSer = await newUSer.save();
    //savedUSer.password = undefined;
    res.status(200).send(savedUSer);
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

exports.signin = async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User is not found" });
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ error: "invalid password" });
  const token = jwt.sign(
    {
      _id: user._id
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  res.cookie("t", token);
  let { id, name, role } = user;
  res
    .header("auth-token", token)
    .status(200)
    .json({ token, user: { id, name, email, role } });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: " You signed Out", token });
};

exports.check = (req, res) => {
  res.send(req.user);
};

exports.requireSignin = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("Access denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "not authorised token" });
  }
};

exports.isAuth = (req, res, next) => {
  const user = req.profile._id == req.user._id;
  if (!user) {
    return res.status(400).json({
      msg: "Not your account chicky boy",
      reqprofile: req.user._id,
      requser: req.user._id,
      user
    });
  }

  next();
};
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(400).send("Admin material");
  }
  next();
};
