const Sequelize = require("sequelize");

class ContactStory extends Sequelize.Model {
  static initiate(sequelize) {
    ContactStory.init(
      {
        type: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ContactStory",
        tableName: "contactStory",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(models) {}
}

module.exports = ContactStory;
