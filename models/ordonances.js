"use strict";
module.exports = (sequelize, DataTypes) => {
  var Ordonances = sequelize.define("Ordonances", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING
    },
    numsecu: {
      type: DataTypes.INTEGER
    }
  });

  Ordonances.associate = function(models) {
    // Ordonances.belongsTo(models.Commande, {
    //   foreignKey: "OrdonanceId",
    //   onDelete: "CASCADE"
    // });
  };

  return Ordonances;
};
