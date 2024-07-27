const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    console.log("home-routes", req.method, req.url);
    res.render("home");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    console.log("home-routes:", req.method, req.path);
    res.render("dashboard");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", async (req, res) => {
  try {
    console.log("home-routes:", req.method, req.path);
    res.render("login");
  } catch (error) {
    res.status(500).json(error);
  }
});

/* EXPORTS */
module.exports = router;
