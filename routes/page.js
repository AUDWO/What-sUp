const express = require("express");
const router = express.Router();
const { renderMain, renderPosts } = require("../controllers/page");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

router.use((req, res, next) => {
  //res.locals미들에워 간에 공유되는 데이터
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || [];
  //res.sessiom:사용자의 고유한 데이터

  next();
});

router.get("/user", renderMain);
router.get("/renderposts", renderPosts);

module.exports = router;
