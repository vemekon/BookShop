const express = require("express");
const router = express.Router();

const {
  movie,
  list,
  c,
  listc,
  dele,
  fnd,
  cdele,
  unew,
  ulist
} = require("../controller/movie");

router.post("/movie", movie);
router.delete("/movie/:id", dele);
router.get("/movie/:id", fnd);
router.get("/userr", ulist);
router.post("/userr", unew);

router.get("/movie", list);
router.post("/c", c);
router.delete("/c/:id", cdele);

router.get("/c", listc);

module.exports = router;
