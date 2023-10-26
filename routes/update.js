const express = require("express");
const router = express.Router();

const {
  updatePostLikeCount,
  updateCommentLikeCount,
} = require("../controllers/update");

router.patch("/postLikeCount", updatePostLikeCount);
router.patch("/commentLikeCount", updateCommentLikeCount);

//user
router.patch("/user/profile-info");

module.exports = router;
