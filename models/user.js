const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        profileImg: {
          type: Sequelize.STRING(140),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },

        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.Story, {
      foreignKey: "reacter",
      through: "ContactStory",
    });
    db.User.belongsToMany(db.Diary, {
      foreignKey: "reacter",
      through: "ContactDiary",
    });

    db.User.belongsToMany(db.Post, {
      through: "PostLike",
    });
    db.User.belongsToMany(db.PostComment, {
      through: "PostCommentLike",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
}

module.exports = User;
