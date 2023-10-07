const Post = require("../models/post");
const Hashtag = require("../models/hashtag");
const { hashtag } = require("bcrypt");

exports.afterUploadImage = (req, res) => {
  res.json({ url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
      title: req.body.title,
      likeCountControl: req.body.likeCountControl,
      commentControl: req.body.commentControl,
      contentControl: req.body.contentControl,
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { tagName: tag.slice(1).toLowerCase() },
          });
        })
      );
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.status(200);
  } catch (error) {
    console.error(error);
  }
};
