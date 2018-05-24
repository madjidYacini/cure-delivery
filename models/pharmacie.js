"use strict";
module.exports = (sequelize, DataTypes) => {
  var Pharmacie = sequelize.define("Pharmacie", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nom: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.INTEGER
    }
  });

  Pharmacie.associate = function(models) {
    Pharmacie.hasMany(models.Commande, {
      foreignKey: "PharmacieId",
      onDelete: "CASCADE"
    });
  };
  return Pharmacie;
};
