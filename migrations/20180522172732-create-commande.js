"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Commandes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.INTEGER
      },
      state_livraison: {
        type: Sequelize.ENUM("LIVRE", "NON-LIVRE")
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "User",
          key: "id"
        }
      },
      OrdonanceId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Ordonances",
          key: "id"
        }
      },
      PharmacieId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Pharmacie",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Commandes");
  }
};
