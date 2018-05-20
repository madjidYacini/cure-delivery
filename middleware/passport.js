import  LocalStrategy from ("passport-local").Strategy;

import  User  from "../models/user";
import bcrypt from ("bcryptjs");

module.exports = passport => {
  // local strategy
  passport.use(
    new LocalStrategy((email, password, done) => {
      // match email
      let query = { username: username };
      User.findOne(query, (err, user) => {
        if (err) {
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
      });
    })
  );
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
