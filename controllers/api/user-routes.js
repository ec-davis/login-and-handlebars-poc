const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    req.session.save(() => {
      //   req.session.loggedIn = true;
      res.status(200).json("Login successful");
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

/* EXPORTS */
module.exports = router;
