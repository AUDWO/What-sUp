const express = require("express");
const router = express.Router();

const {
  updatePostLikeCount,
  updateCommentLikeCount,
} = require("../controllers/update");

router.patch("/postLikeCount", updatePostLikeCount);
router.patch("/commentLikeCount", updateCommentLikeCount);

module.exports = router;
