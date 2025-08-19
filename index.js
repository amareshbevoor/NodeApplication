const express = require("express");
const app = express();
const PORT = 4000;
const users = require("./MOCK_DATA.json");
const { logReqRes } = require("./middlewares");
const { connectMongoDB } = require("./connection");

const userRouter = require("./routes/user");

app.use(express.urlencoded({ extended: false }));

connectMongoDB("mongodb://localhost:27017/userdb").then(
  console.log("MongoDb connected..")
);

app.get("/", (req, res) => {
  res.send("Welcome to Node JS");
});

app.use("/api/users", userRouter);

app.use(logReqRes("log.txt"));

app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});
