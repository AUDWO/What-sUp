const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const router = express.Router();
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport");
const app = express();
const passportConfig = require("./passport");

dotenv.config();
//const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const pageRouter = require("./routes/page");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const { sequelize } = require("./models");

passportConfig();
app.set("port", process.env.PORT || 8090);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.json());
var cors = require("cors");
app.use(cors());
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
//const cors = require("cors");
//app.use(cors());

app.listen(8005, () => {
  console.log("Listening on 8005");
});
app.use(express.static(path.join(__dirname, "prototype-client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "prototype-client/build/index.html"));
});

app.use("/page", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

//react에서 react-router-dom으로 다룰 수 있게
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/prototype-client/build/index.html"));
});
//에러 처리 담당

app.use((req, res, next) => {
  const error = new Error(`${(req, method)} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  //res.loacls.message = err.message;
  res.locals.erorr = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.send("tlqkf wrkxsp");
});

[
  {
    id: 1,
    email: "kmjstj3@naver.com",
    nickname: "audwo",
    password: "$2b$12$2G6eQv2SO1CJRTa8D4UZyOVLUAQk7miXAxQoYKdzTL73h9teVG1Cu",
    provider: "local",
    snsId: null,
    createdAt: "2023-09-14T14:12:34.000Z",
    updatedAt: "2023-09-14T14:12:34.000Z",
    deletedAt: null,
  },
];
