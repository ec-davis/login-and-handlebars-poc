const router = require("express").Router();
const { User } = require("../../models");

// signup - creates new user
router.post("/", async (req, res) => {
  try {
    const user = await User.create({
      emailAddress: req.body.emailAddress,
      password: req.body.password,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(
      "user-routes post /: Error occurred while creating User",
      error
    );
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({});
    if (!userData) {
      res.status(404).json("No users exist");
      return;
    }
    res.status(200).json(userData);
  } catch (error) {
    console.log("user-routes get /: Error occurred while getting Users", error);
    res.status(500).json(error);
  }
});

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
