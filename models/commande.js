"use strict";
module.exports = (sequelize, DataTypes) => {
  const Commande = sequelize.define(
    "Commande",
    {},
    {
      classMethods: {
        associate: function(models) {
          Commande.belongsTo(models.User);
          Commande.belongsTo(models.Ordonances);
          Commande.belongsTo(models.Pharmacie);
        }
      }
    }
  );
  return Commande;
};
