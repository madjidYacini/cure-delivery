import { User } from "../models";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jwt-simple";
import { secret } from "../config";

// > Generate the token here
// -----------------------------------
function tokenForUser(user) {
  console.log("config is", secret);
  let timespam = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timespam
    },
    secret
  );
}

exports.get_user = async (req, res) => {
  try {
    let users = await User.findAll();
    res.json({ users });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      err
    });
  }
};

exports.user_protected = async (req, res, next) => {
  res.send("Hello this is secret");
};

// > User Sign Up
// -------------------------------------------
exports.user_signup = (req, res) => {
  let email = req.body.email;
  // console.log(req.body);
  // let user = new User({ firstname, lastname, email });
  // console.log("madjid",user);
  console.log(email);

  const user = User.find({ where: { email: email } }).then(user => {
    // console.log(user.length);
    if (user) {
      return res.status(409).json({ message: "user already exists" });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          try {
            let {
              firstname,
              lastname,
              email,
              address,
              password,
              passwordConfirm
            } = req.body;

            let passwordCon = req.body.passwordConfirm;

            console.log(passwordCon);

            console.log(password.localeCompare(passwordCon));

            // var passwordRegex = new RegExp(
            //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
            // );
            // const nameRegex = new RegExp("^[_A-z]*((-|s)*[_A-z])*$");

            // req.checkBody("firstname", "firstname is required").notEmpty();
            // req
            //   .checkBody("firstname", "firstname should have juste letters.")
            //   .matches(nameRegex);

            req.checkBody("email", "Email is required").notEmpty();

            // req.checkBody("lastname", "lastname is required").notEmpty();
            // req
            //   .checkBody("lastname", "lastname should have juste letters.")
            //   .matches(nameRegex);

            // req.checkBody("address", "address is required").notEmpty();

            // req.checkBody("password", "password is required").notEmpty();
            // req
            //   .checkBody(
            //     "password",
            //     "password should have at least , one uppercase , lowercase and a number and at least 8 chars"
            //   )
            //   .matches(passwordRegex);

            // req
            //   .checkBody("passwordConfirm", "password2 is required")
            //   .notEmpty();
            // req
            //   .checkBody("passwordConfirm", "passwords do not match")
            //   .equals(password);

            let errors = req.validationErrors();

            if (errors) {
              res.status(409).json({ message: errors });
            } else {
              //  console.log(password.match(passwordRegex))
              let user = {
                firstname,
                lastname,
                email,
                address,
                password,
                passwordConfirm
              };

              // user.password = hash;

              console.log(user);

              try {
                // let data = user.save();
                User.create(user)
                  .then(u => {
                    // console.log("user db is ", u);
                    res.status(200).send({
                      message: "user created",
                      user_id: u.id,
                      user: user,
                      token: tokenForUser(u)
                    });
                  })
                  .catch(err => {
                    res.status(400).json({ err: err.message });
                  });

                // > send token to response
                // res.status(200).json({
                //   message: "user created",
                //   user_id: "",
                //   user: user,
                //   token: tokenForUser(user)
                // });
                // res.redirect ('/api/users/login')
              } catch (err) {
                res.status(500).json({ error: err });
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      });
    }
  });
};

// > User Login
// ----------------------------------------------
exports.user_login = (req, res, next) => {
  let user = req.user;

  console.log("user login -->", user);

  res.send({
    token: tokenForUser(user),
    user_id: user.id
  });
};

// exports.user_informations = async (req, res, next) => {
//   try {
//     let user = await User.find({ where: { id: req.params.id } });
//     if (user) {
//       res.status(200).json({
//         message: "there are your information",
//         user: user
//       });
//     } else {
//       console.log("merde");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

User.update(updateOps, { where: { id: req.params.id } })
  .then(result => {
    console.log(result);
    console.log(result);
    res.status(200).json({
      message: "profil updated"
    });
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });

// console.log(Array.isArray(ar));

// recuperer l'utilisateur ---> done
// comparer l'ancien password entré dans le form avec celui qui est en base -->done
// modifier le password et le hasher
exports.user_update_password = async (req, res, next) => {
  const id = req.params.id;
  var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  try {
    let user = await User.find({ where: { id: id } });
    if (user) {
      console.log(user);
      console.log(user.password);
      let password = req.body.password;
      let newPassword = req.body.newPassword;
      let newPasswordConfirm = req.body.newPasswordConfirm;
      console.log("why", req.body.password);
      console.log(user.password);

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        console.log(err);
        console.log(result);
        if (result) {
          req.checkBody("newPassword", "password is required").notEmpty();
          req
            .checkBody(
              "newPassword",
              "password should have at least , one uppercase , lowercase and a number and at least 8 chars"
            )
            .matches(passwordRegex);

          req
            .checkBody("newPasswordConfirm", "newPasswordConfirm is required")
            .notEmpty();
          req
            .checkBody("newPasswordConfirm", "passwords do not match")
            .equals(newPassword);
          let errors = req.validationErrors();

          if (errors) {
            res.status(409).json({ message: errors });
          } else {
            console.log(newPassword);
            bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
              if (err) {
                res.status(500).json({ error: err });
              } else {
                User.update({ password: hash }, { where: { id: id } });
                res.status(200).json({
                  message: "password updated"
                });
              }
            });
          }
        } else {
          if (err) {
            res.status(500).json({
              message: "system Error"
            });
          } else {
            res.status(401).json({
              message: "wrong password, try again"
            });
          }
        }
      });
    }
  } catch (error) {
    console.log(err);
  }
};
