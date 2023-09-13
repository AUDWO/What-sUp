const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = reqiure("express-session");
const router = express.Router();
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const pageRouter = require("./routes/page");

app.set("port", process.env.PORT || 8090);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "prototpye-client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUnitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "prototype-client/build/index.html"));
});

app.use((req, res, next) => {
  const error = new Error(`${(req, method)} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.loacls.message = err.message;
  res.locals.erorr = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
});

//react에서 react-router-dom으로 다룰 수 있게
app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/clienttt/build/index.html"));
});

app.listen(app.set, () => {
  console.log("Listening on 8090");
});
