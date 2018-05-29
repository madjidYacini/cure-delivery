import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import expressValidator from "express-validator";
import passport from "passport";
import session from "express-session";
import "colors";
import dotenv from "dotenv";
dotenv.config();

import db from "./models";

import routes from "./routes";

const app = express();

app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "{" + namespace.shift() + "}";
      }
      return {
        param: formParam,
        msg: msg
      };
    }
  })
);

require("./middleware/passport");

app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

db.sequelize.sync({}).then(() => {
  app.use("/api", routes);

  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err.red);
      process.exit(1);
    }

    console.log(`Server is running at port ${process.env.PORT}`.cyan);
  });
});
