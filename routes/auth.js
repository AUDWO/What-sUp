const express = require("express");
const router = express.Router();
const { join, login, logout } = require("../controllers/auth");

router.post("/join", join);

router.post("/login", login);

router.get("/logout", logout);
