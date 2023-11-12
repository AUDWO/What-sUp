const Sequelize = require("sequelize");

class ContactDiary extends Sequelize.Model {
  static initiate(sequelize) {
    ContactDiary.init(
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
        modelName: "ContactDiary",
        tableName: "contactDiary",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(models) {}
}

module.exports = ContactDiary;
