const Sequelize = require("sequelize");

class PostComment extends Sequelize.Model {
  static initiate(sequelize) {
    PostComment.init(
      {
        content: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        likeCount: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        likeCheck: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamp: false,
        paranoid: false,
        modelName: "PostComment",
        tableName: "postComments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.PostComment.belongsTo(db.User);
    db.PostComment.belongsTo(db.Post);
    //hasMany는 원래 foreignKey(외래키)를 가지고 있다.
    db.PostComment.hasMany(db.PostComment);
    db.PostComment.belongsToMany(db.User, {
      through: "PostCommentLike",
    });
  }
}

module.exports = PostComment;
