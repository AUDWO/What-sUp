const Sequelize = require("sequelize");

class StoryComment extends Sequelize.Model {
  static initiate(sequelize) {
    StoryComment.init(
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
        loveCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        smileCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        sadCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        contactCheck: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamp: false,
        paranoid: false,
        modelName: "StoryComment",
        tableName: "storyComments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.StoryComment.belongsTo(db.User);
    db.StoryComment.belongsTo(db.Story);
    db.StoryComment.hasMany(db.StoryComment);
  }
}

module.exports = StoryComment;
