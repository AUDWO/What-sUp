const Sequelize = require("sequelize");

class DiaryComment extends Sequelize.Model {
  static initiate(sequelize) {
    DiaryComment.init(
      {
        content: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        likeCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        likeCheck: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamp: false,
        paranoid: false,
        modelName: "DiaryComment",
        tableName: "diaryComments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.DiaryComment.belongsTo(db.User);
    db.DiaryComment.belongsTo(db.Diary);
    db.DiaryComment.hasMany(db.DiaryComment);
  }
}

module.exports = DiaryComment;
