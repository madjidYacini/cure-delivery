'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
   firstname: {
     type: DataTypes.STRING,
     required: true,
     validate: {
       notEmpty: true,
     }
   },
   lastname: {
     type: DataTypes.STRING,
     required: true,
     validate: {
       notEmpty: true,
     }
   },
   email: {
     type: DataTypes.STRING,
     required: true,
     validate: {
       isEmail: true,
     },
     unique: {
       args: true,
       msg: 'Email address already in use!'
     }
   },
    address: {
     type: DataTypes.STRING,
     required: true,
   },

   password: {
     type: DataTypes.STRING,
     required: true,
    
   },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};