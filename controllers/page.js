const User = require("../models/user");
const Post = require("../models/post");
//서비스를 호출하는 코

exports.renderMain = async (req, res, next) => {
  if (res.locals.user) {
    const email = res.locals.user.email;
    const following = res.locals.followingCount;
    const follower = res.locals.followerCount;

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      res.send({ ...user.dataValues, follower, following });
    } catch (error) {
      console.error(error);
      next(error);
    }
  } else {
    next();
  }
};

exports.renderPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });
    const onlyInfoPosts = posts.map((post) => post.dataValues);

    res.send(onlyInfoPosts);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
