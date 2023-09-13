const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    const exUserNickname = await User.findOne({ where: { nick } });
    if (exUser) {
      //아미 존재하는 이메일
    }
    if (exUserNickname) {
      //이미 존재하는 닉네임
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
