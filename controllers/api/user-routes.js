const router = require("express").Router();
const { User } = require("../../models");

// checks DEV_MODE to protect against enabling dev-only methods in production
const isDevMode = process.env.DEV_MODE == "true" ? true : false;
isDevMode
  ? console.log("DEV MODE enabled. Dev-only methods are available")
  : console.log(
      "Running in production mode. Dev-only methods will throw errors if called"
    );

// signup - creates new user
router.post("/", async (req, res) => {
  try {
    console.log("user-routes", req.method, req.url);
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json({ user: user });
    });
  } catch (err) {
    console.log(`Error occurred while creating User: ${err}`);
    res.status(400).json(err);
  }
});

// Login!
router.post("/login", async (req, res) => {
  try {
    console.log("user-routes post: login");
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json("Login successful");
      console.log("End of save block, req.session: ", req.session);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

/////////////////////////////////////////////
// DEV METHODS - for use only during development

// deletes all users, to clear the clutter of test users
router.delete("/", async (req, res) => {
  console.log("user-routes", req.method, req.url);
  if (!isDevMode)
    throw new Error("Dev-only method called when in production mode");
  try {
    await User.destroy({ where: {} });
    res.status(200).json("Users deleted");
  } catch (error) {
    console.log(`Error occurred while deleting all Users: ${error}`);
    res.status(500).json(`Error occurred while creating User: ${error}`);
  }
});

// Returns all users. Excludes the password from the response.
router.get("/", async (req, res) => {
  console.log("user-routes", req.method, req.url);
  if (!isDevMode)
    throw new Error("Dev-only method called when in production mode");
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
