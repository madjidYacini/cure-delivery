import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../models";
import { secret } from "../config";
import LocalStrategy from "passport-local";
// const LocalStrategy = require("passport-local").Strategy;

const localOptions = {
  usernameField: "email"
};

let localStrategy = new LocalStrategy(localOptions, (email, password, done) => {
  User.find({
    where: {
      email: email
    }
  }).then((user, err) => {
    console.log("user passport", user);
    if (err) {
      return done(err, false);
    }
    if (!user) {
      return done(null, false);
    }
    console.log("before check pass");
    user.checkPassword(password, (error, isMatch) => {
      console.log("check pass");
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

const jwtOption = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromHeader("authorization")
};

let jwtStrategy = new Strategy(jwtOption, (payload, done) => {
  User.find({
    where: {
      id: payload.sub
    }
  }).then(function(user, err) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    }
  });
});

passport.use(jwtStrategy);
passport.use(localStrategy);

// import User from "../models/user.js";
// import bcrypt from "bcryptjs";

// // module.exports = passport => {
// // local strategy
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password"
//     },
//     (email, password, done) => {
//       console.log("test");
//       User.findOne(
//         {
//           email: email
//         },
//         (err, user) => {
//           if (err) {
//             // console.log(err);

//             // console.log(user);
//             return done(err);
//           }
//           if (!user) {
//             return done(null, false, { message: "no user found" });
//           }

//           // match password

//           bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) throw err;

//             if (isMatch) {
//               return done(null, user);
//             } else {
//               return done(null, false, { message: "wrong password" });
//             }
//           });
//         }
//       );
//     }
//   )
// );
// // passport.use(
// //   new LocalStrategy((email, password, done) => {

// //   })
// // );
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.find({ where: { id: id } }, function(err, user) {
//     done(err, user);
//   });
// });
// // };
