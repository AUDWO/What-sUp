const User = require("../models/user");

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
      // req.params.id에는 팔로잉을 취소하려는 사용자의 ID가 있어야 합니다.
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
      console.log("user입니다 user입니다 user입니다", user);
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

    const checkFollower = () => {
      let check = false;
      user.dataValues.Followers.forEach((userId) => {
        if (userId === req.locals.user.id) {
          check = true;
        }
      });

      return check;
    };

    if (user) {
      res.send(user.dataValues);
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
