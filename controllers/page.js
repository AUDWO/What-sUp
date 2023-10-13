const User = require("../models/user");
const Post = require("../models/post");
const Story = require("../models/story");
//서비스를 호출하는 코\\

const PostComment = require("../models/postComment");
const StoryComment = require("../models/storyComment");
const DiaryComment = require("../models/diaryComment");

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

exports.renderPostsComments = async (req, res, next) => {
  try {
    const postsComments = await PostComment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Post,
          attributes: ["id"],
        },
      ],
    });

    const onlyInfoPostsComments = postsComments.map(
      (comments) => comments.dataValues
    );
    res.send(onlyInfoPostsComments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderStory = async (req, res, next) => {
  try {
    const stories = await Story.findAll({
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });

    const onlyInfoStory = stories.map((story) => story.dataValues);
    res.send(onlyInfoStory);
    console.log("10101010101010");
    console.log(onlyInfoStory);
  } catch (error) {
    console.error(error);
  }
};

exports.renderStoryComments = async (req, res, next) => {
  try {
    const storyComments = await StoryComment.findAll({
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });

    const onlyInfoStoryComments = storyComments.map(
      (comments) => comments.dataValues
    );
    res.send(onlyInfoStoryComments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderStroyReplyComments = async (req, res, next) => {
  const storyCommentId = req.body.StoryCommentId;
  try {
    const replyComments = await StoryComment.findAll({
      where: { StoryId: storyCommentId },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });

    const onlyInfoStoryReplyComments = replyComments.map(
      (comment) => comment.dataValues
    );
    res.send(onlyInfoStoryReplyComments);
  } catch (error) {
    console.error(error);
  }
};

/*

exports.renderStoryComments = async(req,res,next)=> {
  try{
    const storyComments = await StoryComment.findAll()

  } catch(error){

  }
}*/
