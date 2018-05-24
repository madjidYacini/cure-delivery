'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pharmacie = sequelize.define('Pharmacie', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Pharmacie;
};