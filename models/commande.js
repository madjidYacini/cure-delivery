'use strict';
module.exports = (sequelize, DataTypes) => {
  var Commande = sequelize.define('Commande', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Commande;
};