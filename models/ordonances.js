'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ordonances = sequelize.define('Ordonances', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ordonances;
};