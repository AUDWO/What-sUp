const Post = require("../models/post");
const Story = require("../models/story");

exports.increaseLikeCount = async (req, res, next) => {
  try {
    const postId = req.body.id;
    const likeCount = req.body.likeCount;

    const updatePost = await Post.update(
      { likeCount: likeCount, likeCheck: true },
      { where: { id: postId } }
    );

    if (postId[0] === 1) {
      // 업데이트 성공
      res.status(200).json({ message: "Story updated successfully" });
    } else {
      // 업데이트할 스토리를 찾지 못한 경우
      res.status(404).json({ message: "Story not found" });
    }
  } catch (error) {
    console.error(error);
  }
};
