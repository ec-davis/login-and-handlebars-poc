const e = require("express");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    console.log("home-routes.js: get /");
    res.render("home");
  } catch (err) {
    res.status(500).json(err);
  }
});

/* EXPORTS */
module.exports = router;
