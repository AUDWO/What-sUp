const PostComment = require("../models/postComment");
const DiaryComment = require("../models/diaryComment");
const StoryComment = require("../models/storyComment");
const Story = require("../models/story");
const Post = require("../models/post");

exports.postPostsComment = async (req, res, next) => {
  if (req.body.PostCommentId === undefined) {
    req.body.PostCommentId = null;
  }
  try {
    const postCommentUpdate = await PostComment.create({
      content: req.body.content,
      UserId: req.user.id,
      PostId: req.body.PostId,
      PostCommentId: req.body.PostCommentId,
    });

    const postCountUpdate = await Post.increment(
      { commentCount: 1 },
      { where: { id: req.body.PostId } }
    );

    res.status(200);
  } catch (error) {
    console.error(error);
  }
};

exports.postStoryComment = async (req, res, next) => {
  if (req.body.StoryCommentId === undefined) {
    req.body.StoryCommentId = null;
  }
  try {
    const post = await StoryComment.create({
      content: req.body.content,
      UserId: req.user.id,
      StoryId: req.body.StoryId,
      StoryCommentId: req.body.StoryCommentId,
    });

    res.status(200);
  } catch (error) {
    console.error(error);
  }
};

/*
exports.postStoryComment = async (req, res, next) => {
  try{
    const post = await StoryComment.create({

    })

  } catch(error) {

  }
}
;
*/
//exports.postDiaryComment = async (req, res, next) => {};
