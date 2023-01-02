const express = require("express");
const app = express();
const userRouter = require("./routes/user.routes");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const connect = require("./config/db");

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("welcome to tmetric backend");
});

app.listen(PORT, async (req, res) => {
  await connect();
  console.log(`server started at ${PORT}`);
});
