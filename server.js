const path = require("path");
const express = require("express");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const controllers = require("./controllers");

const sess = {
  secret: "This is not very secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3002;

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));
app.use(controllers);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));
});
