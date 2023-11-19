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

    res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

exports.postCommentLike = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const postComment = await PostComment.findOne({
      where: { id: commentId },
    });

    await postComment.addUser(req.user.id);

    res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

exports.postCommenUntLike = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const postComment = await PostComment.findOne({
      where: { id: commentId },
    });

    await postComment.removeUser(req.user.id);

    res.status(200).send("success");
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

    res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

exports.postDiaryComment = async (req, res, next) => {
  if (req.body.DiaryCommentId === undefined) {
    req.body.DiaryCommentId = null;
  }
  try {
    const post = await DiaryComment.create({
      content: req.body.content,
      UserId: req.user.id,
      diaryId: req.body.DiaryId,
      DiaryCommentId: req.body.DiaryCommentId,
    });

    res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};
