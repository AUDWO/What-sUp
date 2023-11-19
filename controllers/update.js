const Post = require("../models/post");
const PostComment = require("../models/postComment");
const Story = require("../models/story");
const User = require("../models/user");
const Diary = require("../models/diary");

exports.updatePostLikeCount = async (req, res, next) => {
  try {
    const postId = req.body.id;
    const likeCount = req.body.likeCount;
    const likeCheck = req.body.likeCheck;

    const updatePost = await Post.update(
      { likeCount: Number(likeCount), likeCheck: likeCheck },
      { where: { id: postId } }
    );
    res.status(200).json({ message: "PostLikeCount updated successfully" });
  } catch (error) {
    console.error(error);
  }
};

exports.updateCommentLikeCount = async (req, res, next) => {
  try {
    const commentId = req.body.id;
    const likeCount = req.body.likeCount;
    const likeCheck = req.body.likeCheck;

    const updatePost = await PostComment.update(
      { likeCount: Number(likeCount), likeCheck: likeCheck },
      { where: { id: commentId } }
    );
    res
      .status(200)
      .json({ message: "PostCommentLikeCount updated successfully" });
  } catch (error) {
    console.error(error);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  try {
    if (req.body.img) {
      const updateUser = await User.update(
        {
          nickname: req.body.nickname,
          profileImg: req.body.img,
          name: req.body.name,
        },
        { where: { id: req.user.id } }
      );
    }

    if (!req.body.img) {
      const updateUser = await User.update(
        {
          nickname: req.body.nickname,
          name: req.body.name,
        },
        { where: { id: req.user.id } }
      );
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
  }
};

//게시물 정보 변경
exports.updatePostInfo = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const updatePost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        lkeControl: req.body.likeControl,
        commentControl: req.body.commentControl,
      },
      {
        where: { id: postId },
      }
    );

    return res.status(200).send("Post updated successfully");
  } catch (error) {
    console.error(error);
  }
};

//일기 정보 변경
exports.updateDiaryInfo = async (req, res, next) => {
  try {
    const diaryId = req.params.diaryId;

    const updateDiary = await Diary.update(
      {
        publicControl: req.body.publicControl,
        likeControl: req.body.likeControl,
        commentControl: req.body.commentControl,
      },
      {
        where: { id: diaryId },
      }
    );
    return res.status(200).send("Diary updated successfully");
  } catch (error) {
    console.error(error);
  }
};

exports.updateDiaryReactInfo = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;

    const updateDiary = await Diary.update(
      {
        reactCount: Number(req.body.reactCount),
      },
      {
        where: { id: diaryId },
      }
    );
    return res.status(200).send("Diary updated successfully");
  } catch (error) {
    console.error(error);
  }
};

/**
 * 
 *  if (updatePost[0] === 1) {
      // 업데이트 성공
      res.status(200).json({ message: "Story updated successfully" });
    } else {
      // 업데이트할 스토리를 찾지 못한 경우
      res.status(404).json({ message: "Story not found" });
    }
 */
