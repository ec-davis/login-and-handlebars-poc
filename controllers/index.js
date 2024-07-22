const router = require("express").Router();

/* ROUTES */
const homeRoutes = require("./home-routes.js");

router.use("/", homeRoutes);

/* EXPORTS */
module.exports = router;
