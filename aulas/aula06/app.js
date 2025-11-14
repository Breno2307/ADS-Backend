const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const tarefaRouter = require("./routes/tarefasRouter.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:8000/",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/tarefas", tarefaRouter);

module.exports = app;
