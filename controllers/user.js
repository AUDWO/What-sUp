const User = require("../models/user");
const Post = require("../models/post");
const Diary = require("../models/diary");

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });

    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.findUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    if (user) {
      res.send({ ...user.dataValues });
    } else {
      res.status(404).send("no user");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.checkFollower = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followers",
        }, //팔로잉git
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followings",
        }, //팔로워
      ],
    });

    if (user) {
      res.send({
        ...user.dataValues,
      });
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
  }
};

exports.checkFollowerr = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followers",
        }, //팔로잉git
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followings",
        }, //팔로워
      ],
    });

    if (user) {
      let check = false;
      for (let i = 0; i < user.dataValues.Followers.length; i++) {
        if (Number(user.dataValues.Followers[i].id) === Number(req.user.id)) {
          check = true;
        }
      }
      res.send(check);
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
  }
};
