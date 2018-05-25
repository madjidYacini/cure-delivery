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

// probleme de l'updtae a soulever demain avec majdi

// exports.user_update_info = async (req, res, next) => {
//   const id = req.params.id;
//   // console.log(req.body)

//   const updateOps = {};
//   for (const [key, value] of Object.entries(req.body)) {
//     updateOps[key] = value;
//   }

//   User.update(updateOps, { where: { id: req.params.id } })
//     .then(result => {
//       console.log(result);
//       console.log(result);
//       res.status(200).json({
//         message: "prodcut updated",
//         request: {
//           type: "GET",
//           desc: "view the product",
//           url: "http://localhost:3000/products/" + id
//         }
//       });
//     })
//     .catch(err => {
//       res.status(500).json({ error: err });
//     });

//   // console.log(Array.isArray(ar));
// };
