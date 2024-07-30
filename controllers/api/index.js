const router = require("express").Router();

/* ROUTES */
const userRoutes = require("./user-routes.js");

router.use("/users", userRoutes);

/* EXPORTS */
module.exports = router;
