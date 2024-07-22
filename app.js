// dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const hbs = exphbs.create({});
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

// HANDLEBARS
const handlebarshelp = require("./utils/handlebars-helper");
const { helpers } = require("handlebars");

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

/* MIDDLEWARE */
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(PORT, () => {
  console.log("listening on port ", PORT);
});
