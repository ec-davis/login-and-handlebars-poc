// dependencies
const express = require("express");
const session = require("express-session");
const { logDBConnectionDetails } = require("./utils/helper");
const { Sequelize } = require("sequelize");
const exphbs = require("express-handlebars");
const path = require("path");
const hbs = exphbs.create({});

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "so secret it absorbs light",
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

// HANDLEBARS
const handlebarshelp = require("./utils/handlebars-helper");
const { helpers } = require("handlebars");

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

/* MIDDLEWARE */
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    logDBConnectionDetails();
    console.log("listening on port ", PORT);
  });
});
