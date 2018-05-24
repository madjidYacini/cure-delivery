"use strict";
module.exports = (sequelize, DataTypes) => {
  const Commande = sequelize.define("Commande", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    totalprice: {
      type: DataTypes.DECIMAL
    },
    statelivraison: {
      type: DataTypes.ENUM("LIVRE", "NON-LIVRE")
    }
  });

  Commande.associate = function(models) {
    Commande.belongsTo(models.Ordonances, {
      foreignKey: "OrdonanceId",
      onDelete: "CASCADE"
    });
    Commande.belongsTo(models.User, {
      foreignKey: "UserId",
      onDelete: "CASCADE"
    });
    Commande.belongsTo(models.Pharmacie, {
      foreignKey: "PharmacieId",
      onDelete: "CASCADE"
    });
  };
  return Commande;
};
