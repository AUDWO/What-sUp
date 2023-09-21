const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares");
const { follow } = require("../controllers/user");
const { findUserById } = require("../controllers/user");

router.get("/:id", isLoggedIn, findUserById);
router.post("/:id/follow", isLoggedIn, follow);

module.exports = router;
