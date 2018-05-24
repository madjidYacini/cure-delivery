  // LocalStrategy from "passport-local".Strategy;
  import passport from "passport";
        const LocalStrategy = require("passport-local").Strategy;

import  User  from "../models/user.js";
import bcrypt from "bcryptjs";

// module.exports = passport => {
  // local strategy

  passport.use(new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
      console.log("test");
      User.findOne(
        {
          email: email
        },
        (err, user) => {
          if (err) {
            // console.log(err);

            // console.log(user);
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "no user found" });
          }

          // match password

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "wrong password" });
            }
          });
        }
      );
      }
    ));
  // passport.use(
  //   new LocalStrategy((email, password, done) => {   
      
  //   })
  // );
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.find({where : {id : id}}, function(err, user) {
      done(err, user);
    });
  });
// };
