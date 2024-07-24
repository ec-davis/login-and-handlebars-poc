const router = require("express").Router();

/* ROUTES */
const userRoutes = require("./user-routes.js");

router.use("/users", userRoutes);
// router.post("/users/login", async (req, res) => {
//   res.json("forks from login!");
// });

/* EXPORTS */
module.exports = router;
