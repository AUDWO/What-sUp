const Sequelize = require("sequelize");

class Diary extends Sequelize.Model {
  static initiate(sequelize) {
    Diary.init(
      {
        title: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(140),
          allowNull: true,
        },
        publicControl: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        commentControl: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        reactCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        likeControl: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamp: false,
        paranoid: false,
        modelName: "diary",
        tagleName: "diarys",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Diary.belongsTo(db.User);
    db.Diary.hasMany(db.DiaryComment);
    db.Diary.belongsToMany(db.User, {
      foreignKey: "responseDiaryId",
      through: "ContactDiary",
    });
  }
}

module.exports = Diary;
