const express = require("express");
const router = express.Router();
const { postPostComment } = require("../controllers/postComment");

router.post("/post", postPostComment);

//router.post("/diary");

//router.post("/story");

module.exports = router;
