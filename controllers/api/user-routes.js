const router = require("express").Router();
const { User } = require("../../models");

// signup - creates new user
router.post("/", async (req, res) => {
  try {
    console.log("user-routes post: create user");
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    // req.session.save(() => {
    //   req.session.loggedIn = true;
    //   res.status(200).json({ user: user });
    // });
    console.log("I think it worked");
    res.status(200).json(user);
  } catch (error) {
    console.log(
      // `Error occurred while creating User: ${error.errors[0].message}`
      `Error occurred while creating User: ${error}`
    );

    res.status(500).json(`Error occurred while creating User: ${error}`);
  }
});

// Login!
router.post("/login", async (req, res) => {
  try {
    console.log("user-routes post: login");
    console.log("req.body", req.body);
    req.session.save(() => {
      //   req.session.loggedIn = true;
      res.status(200).json("Login successful");
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Returns all users. For development only - not to call from front end.
// Excludes the password from the response.
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
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

/* EXPORTS */
module.exports = router;
