const PostComment = require("../models/postComment");
const DiaryComment = require("../models/diaryComment");
const StoryComment = require("../models/storyComment");

exports.postPostComment = async (req, res, next) => {
  try {
    const post = await PostComment.create({
      content: req.body.content,
    });

    res.status(200);
  } catch (error) {
    console.error(error);
  }
};

//exports.postDiaryComment = async (req, res, next) => {};

//exports.postStoryComment = async (req, res, next) => {};
