const Post = require("../models/post");
const PostComment = require("../models/postComment");
const Story = require("../models/story");
const StoryComment = require("../models/storyComment");
const Diary = require("../models/diary");
const DiaryComment = require("../models/diaryComment");
const ContactStory = require("../models/contactStory");
const ContactDiary = require("../models/contactDiary");

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const deletePost = await Post.destroy({
      where: { id: postId },
    });

    return res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

exports.deleteDiary = async (req, res, next) => {
  try {
    const diaryId = req.params.diaryId;

    const deleteDiary = await Diary.destroy({
      where: { id: diaryId },
    });

    return res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

exports.deletePostComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const deleteReplyComment = await PostComment.destroy({
      where: { PostCommentId: commentId },
    });
    const deleteComment = await PostComment.destroy({
      where: { id: commentId },
    });

    return res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

exports.deleteDiaryComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const deleteComment = await DiaryComment.destroy({
      where: { id: commentId },
    });
    return res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

exports.unReactDiary = async (req, res) => {
  try {
    await ContactDiary.destroy({
      where: {
        reacter: req.user.id,
        responseDiaryId: req.params.diaryId,
      },
    });
    res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

exports.deleteStoryComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const deleteComment = await StoryComment.destroy({
      where: { id: commentId },
    });
    return res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

exports.unReactStory = async (req, res) => {
  try {
    await ContactStory.destroy({
      where: {
        reacter: req.user.id,
        responseStoryId: req.params.storyId,
      },
    });
    res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};
