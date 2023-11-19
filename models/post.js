const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        content: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        img: {
          type: Sequelize.STRING(140),
          allowNull: true,
        },
        title: {
          type: Sequelize.STRING(140),
          allowNull: true,
        },
        likeCheck: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        likeControl: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        commentControl: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        contentControl: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        likeCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        commentCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamp: false,
        paranoid: false,
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, {
      through: "PostLike",
    });
  }
}

module.exports = Post;
