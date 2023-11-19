const Sequelize = require("sequelize");

class Story extends Sequelize.Model {
  static initiate(sequelize) {
    Story.init(
      {
        img: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
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
        modelName: "Story",
        tableName: "story",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Story.belongsTo(db.User);
    db.Story.hasMany(db.StoryComment);
    db.Story.belongsToMany(db.User, {
      foreignKey: "responseStoryId",
      through: "ContactStory",
    });
  }
}

module.exports = Story;
