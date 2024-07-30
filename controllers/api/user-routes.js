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
    if (isDevMode) console.log("user-routes", req.method, req.url);
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json({ user: userData });
    });
  } catch (err) {
    console.log(`Error occurred while creating User: ${err}`);
    res.status(400).json(err);
  }
});

/* Post to /api/users/logout, destroys session to log user out */
router.post("/logout", (req, res) => {
  if (isDevMode) console.log("user-routes", req.method, req.url);
  if (req.session.loggedIn) {
    req.session.destroy();
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

/* EXPORTS */
module.exports = router;

// Login!
router.post("/login", async (req, res) => {
  try {
    if (isDevMode) console.log("user-routes post: login");
    const deliberatelyVagueErrorMessage =
      "Email not found or password incorrect. Please try again.";

    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      console.log("User not found with email address", req.body.email);
      res.status(400).json(deliberatelyVagueErrorMessage);
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      console.log("*** Password is invalid. We've repelled an impostor! ***");
      res.status(400).json(deliberatelyVagueErrorMessage);
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json("Login successful");
    });
  } catch (error) {
    console.log(error);
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
    console.log("Error occurred while getting Users", error);
    res.status(500).json(error);
  }
});
