"use strict";
import bcrypt from "bcrypt";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstname: {
        type: DataTypes.STRING,
        required: true,
        validate: {
          notEmpty: true
        }
      },
      lastname: {
        type: DataTypes.STRING,
        required: true,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        validate: {
          isEmail: true
        },
        unique: {
          args: true,
          msg: "Email address already in use!"
        }
      },
      address: {
        type: DataTypes.STRING,
        required: true
      },
      password: {
        type: DataTypes.STRING,
        required: true
      },
      passwordConfirm: {
        type: DataTypes.VIRTUAL
      }
    },
    {
      hooks: {
        beforeCreate: function(user) {
          console.log("user db ------>", user);
          if (user.password != user.passwordConfirm) {
            throw new Error("Passwords doesn't match!");
          }

          let salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },

        //instance db user update
        //with beforebulk use attribute on values
        beforeBulkUpdate: function(user) {
          // if (
          //   user.attributes.password != user.attributes.password_confirmation
          // ) {
          //   throw new Error("Passwords doesn't match!");
          // }
          // let salt = bcrypt.genSaltSync();
          // user.attributes.password = bcrypt.hashSync(
          //   user.attributes.password,
          //   salt
          // );
        },

        //intance u.update
        beforeSave: function() {}
      }
    }
  );

  //User link with Commande
  User.associate = function(models) {
    User.hasMany(models.Commande, {
      foreignKey: "UserId",
      onDelete: "CASCADE"
    });
  };

  // EXTENDS METHODS
  User.prototype.checkPassword = function(password, callBack) {
    console.log("passssssss");
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, isMatch);
    });
  };

  return User;
};
