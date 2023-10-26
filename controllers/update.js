const Post = require("../models/post");
const PostComment = require("../models/postComment");
const Story = require("../models/story");

exports.updatePostLikeCount = async (req, res, next) => {
  try {
    const postId = req.body.id;
    const likeCount = req.body.likeCount;
    const likeCheck = req.body.likeCheck;

    const updatePost = await Post.update(
      { likeCount: Number(likeCount), likeCheck: likeCheck },
      { where: { id: postId } }
    );
    res.status(200).json({ message: "Story updated successfully" });
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
    res.status(200).json({ message: "Story updated successfully" });
  } catch (error) {
    console.error(error);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  try {
    const updateUser = await User.update(
      {
        nickname: req.body.nickname,
        profileImg: req.body.img,
        name: req.body.name,
      },
      { where: { id: req.user.id } }
    );
    res.status(200).json({ message: "User updated successfully" });
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
